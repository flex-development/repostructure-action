/**
 * @file Commands - UpdateEnvironmentHandler
 * @module repostructure/environments/commands/UpdateEnvironmentHandler
 */

import type { Config } from '#src/config'
import type { Environment } from '#src/environments/types'
import { TeamsQuery } from '#src/teams/queries'
import type { Team } from '#src/teams/types'
import { UsersQuery } from '#src/users/queries'
import type { User } from '#src/users/types'
import { get, select } from '@flex-development/tutils'
import { ConfigService } from '@nestjs/config'
import { CommandHandler, QueryBus, type ICommandHandler } from '@nestjs/cqrs'
import { Octokit } from '@octokit/core'
import type { UpdateEnvironmentInput } from '@octokit/graphql-schema'
import * as graphql from 'graphql'
import gql from 'graphql-tag'
import UpdateEnvironmentCommand from './update.command'

/**
 * Environment update command handler.
 *
 * @see {@linkcode Environment}
 * @see {@linkcode UpdateEnvironmentCommand}
 *
 * @class
 * @implements {ICommandHandler<UpdateEnvironmentCommand, Environment>}
 */
@CommandHandler(UpdateEnvironmentCommand)
class UpdateEnvironmentHandler
  implements ICommandHandler<UpdateEnvironmentCommand, Environment> {
  /**
   * GraphQL mutation.
   *
   * @see https://docs.github.com/graphql/reference/mutations#updateenvironment
   *
   * @protected
   * @readonly
   * @instance
   * @member {string} operation
   */
  protected readonly operation: string

  /**
   * Create a new environment update command handler.
   *
   * @see {@linkcode ConfigService}
   * @see {@linkcode Config}
   * @see {@linkcode Octokit}
   * @see {@linkcode QueryBus}
   *
   * @param {Octokit} octokit - Hydrated octokit client
   * @param {ConfigService<Config, true>} config - Infrastructure config service
   * @param {QueryBus} queries - Query bus
   */
  constructor(
    protected readonly octokit: Octokit,
    protected readonly config: ConfigService<Config, true>,
    protected readonly queries: QueryBus
  ) {
    this.operation = graphql.print(gql`
      mutation UpdateEnvironment($input: UpdateEnvironmentInput!) {
        payload: updateEnvironment(input: $input) {
          environment {
            id
            name
           }
        }
      }
    `)
  }

  /**
   * Execute an environment update command.
   *
   * @see {@linkcode Environment}
   * @see {@linkcode UpdateEnvironmentCommand}
   *
   * @public
   * @async
   *
   * @param {UpdateEnvironmentCommand} command - Command to execute
   * @return {Promise<Environment>} Updated environment
   */
  public async execute(
    command: UpdateEnvironmentCommand
  ): Promise<Environment> {
    /**
     * Users and teams that can approve deployments.
     *
     * @var {(Team | User)[]} reviewers
     */
    let reviewers: (Team | User)[] = []

    // get reviewers
    if (command.reviewers) {
      reviewers = [
        ...await this.queries.execute(new UsersQuery({
          logins: get(command.reviewers, 'users', [])
        })),
        ...await this.queries.execute(new TeamsQuery({
          org: this.config.get<string>('owner'),
          teams: get(command.reviewers, 'teams', [])
        }))
      ]
    }

    // update environment
    const {
      payload
    } = await this.octokit.graphql<{ environment: Environment }>({
      input: <UpdateEnvironmentInput>{
        clientMutationId: this.config.get<string>('id'),
        environmentId: command.id,
        preventSelfReview: command.prevent_self_review,
        reviewers: select(reviewers, null, reviewer => reviewer.id),
        waitTimer: command.wait_timer
      },
      query: this.operation
    })

    return payload.environment
  }
}

export default UpdateEnvironmentHandler
