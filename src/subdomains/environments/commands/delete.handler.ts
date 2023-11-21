/**
 * @file Commands - DeleteEnvironmentHandler
 * @module repostructure/environments/commands/DeleteEnvironmentHandler
 */

import type { Config } from '#src/config'
import { Octokit } from '#src/octokit'
import { ConfigService } from '@nestjs/config'
import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs'
import type { DeleteEnvironmentInput } from '@octokit/graphql-schema'
import * as graphql from 'graphql'
import gql from 'graphql-tag'
import DeleteEnvironmentCommand from './delete.command'

/**
 * Environment deletion command handler.
 *
 * @see {@linkcode DeleteEnvironmentCommand}
 *
 * @class
 * @implements {ICommandHandler<DeleteEnvironmentCommand, void>}
 */
@CommandHandler(DeleteEnvironmentCommand)
class DeleteEnvironmentHandler
  implements ICommandHandler<DeleteEnvironmentCommand, void> {
  /**
   * GraphQL mutation.
   *
   * @see https://docs.github.com/graphql/reference/mutations#deleteenvironment
   *
   * @protected
   * @readonly
   * @instance
   * @member {string} operation
   */
  protected readonly operation: string

  /**
   * Create a new environment deletion command handler.
   *
   * @see {@linkcode ConfigService}
   * @see {@linkcode Config}
   * @see {@linkcode Octokit}
   *
   * @param {Octokit} octokit - Hydrated octokit client
   * @param {ConfigService<Config, true>} config - Infrastructure config service
   */
  constructor(
    protected readonly octokit: Octokit,
    protected readonly config: ConfigService<Config, true>
  ) {
    this.operation = graphql.print(gql`
      mutation DeleteEnvironment($input: DeleteEnvironmentInput!) {
        payload: deleteEnvironment(input: $input) {
          clientMutationId
        }
      }
    `)
  }

  /**
   * Execute an environment deletion command.
   *
   * @see {@linkcode DeleteEnvironmentCommand}
   *
   * @public
   * @async
   *
   * @param {DeleteEnvironmentCommand} command - Command to execute
   * @return {Promise<void>} Nothing when complete
   */
  public async execute(command: DeleteEnvironmentCommand): Promise<void> {
    return void (await this.octokit.graphql({
      input: <DeleteEnvironmentInput>{
        clientMutationId: this.config.get('id'),
        id: command.id
      },
      query: this.operation
    }))
  }
}

export default DeleteEnvironmentHandler
