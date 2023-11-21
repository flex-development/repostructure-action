/**
 * @file Commands - CreateEnvironmentHandler
 * @module repostructure/environments/commands/CreateEnvironmentHandler
 */

import type { Config } from '#src/config'
import type { Environment } from '#src/environments/types'
import { Octokit } from '#src/octokit'
import { ConfigService } from '@nestjs/config'
import { CommandBus, CommandHandler, type ICommandHandler } from '@nestjs/cqrs'
import type { CreateEnvironmentInput } from '@octokit/graphql-schema'
import * as graphql from 'graphql'
import gql from 'graphql-tag'
import CreateEnvironmentCommand from './create.command'
import UpdateEnvironmentCommand from './update.command'

/**
 * Environment creation command handler.
 *
 * @see {@linkcode CreateEnvironmentCommand}
 * @see {@linkcode Environment}
 *
 * @class
 * @implements {ICommandHandler<CreateEnvironmentCommand, Environment>}
 */
@CommandHandler(CreateEnvironmentCommand)
class CreateEnvironmentHandler
  implements ICommandHandler<CreateEnvironmentCommand, Environment> {
  /**
   * GraphQL mutation.
   *
   * @see https://docs.github.com/graphql/reference/mutations#createenvironment
   *
   * @protected
   * @readonly
   * @instance
   * @member {string} operation
   */
  protected readonly operation: string

  /**
   * Create a new environment creation command handler.
   *
   * @see {@linkcode CommandBus}
   * @see {@linkcode ConfigService}
   * @see {@linkcode Config}
   * @see {@linkcode Octokit}
   *
   * @param {Octokit} octokit - Hydrated octokit client
   * @param {ConfigService<Config, true>} config - Infrastructure config service
   * @param {CommandBus} commands - Command bus
   */
  constructor(
    protected readonly octokit: Octokit,
    protected readonly config: ConfigService<Config, true>,
    protected readonly commands: CommandBus
  ) {
    this.operation = graphql.print(gql`
      mutation CreateEnvironment($input: CreateEnvironmentInput!) {
        payload: createEnvironment(input: $input) {
          environment {
            id
            name
           }
        }
      }
    `)
  }

  /**
   * Execute an environment creation command.
   *
   * @see {@linkcode CreateEnvironmentCommand}
   * @see {@linkcode Environment}
   *
   * @public
   * @async
   *
   * @param {CreateEnvironmentCommand} command - Command to execute
   * @return {Promise<Environment>} New environment
   */
  public async execute(
    command: CreateEnvironmentCommand
  ): Promise<Environment> {
    // create environment
    const {
      payload
    } = await this.octokit.graphql<{ environment: Environment }>({
      input: <CreateEnvironmentInput>{
        clientMutationId: this.config.get<string>('id'),
        name: command.name,
        repositoryId: this.config.get<string>('node_id')
      },
      query: this.operation
    })

    // update environment
    return this.commands.execute(new UpdateEnvironmentCommand({
      ...command,
      id: payload.environment.id
    }))
  }
}

export default CreateEnvironmentHandler
