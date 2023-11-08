/**
 * @file Commands - DeleteLabelHandler
 * @module repostructure/commands/DeleteLabelHandler
 */

import type { Config } from '#src/config'
import { ConfigService } from '@nestjs/config'
import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs'
import { Octokit } from '@octokit/core'
import * as graphql from 'graphql'
import gql from 'graphql-tag'
import DeleteLabelCommand from './delete.command'

/**
 * Label deletion command handler.
 *
 * @see {@linkcode DeleteLabelCommand}
 *
 * @class
 * @implements {ICommandHandler<DeleteLabelCommand, void>}
 */
@CommandHandler(DeleteLabelCommand)
class DeleteLabelHandler implements ICommandHandler<DeleteLabelCommand, void> {
  /**
   * GraphQL mutation.
   *
   * @see https://docs.github.com/graphql/reference/mutations#deletelabel
   *
   * @protected
   * @readonly
   * @instance
   * @member {string} operation
   */
  protected readonly operation: string

  /**
   * Create a new label deletion command handler.
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
      mutation ($input: DeleteLabelInput!) {
        payload: deleteLabel(input: $input) {
          clientMutationId
        }
      }
    `)
  }

  /**
   * Execute a label deletion command.
   *
   * @see {@linkcode DeleteLabelCommand}
   *
   * @public
   * @async
   *
   * @param {DeleteLabelCommand} command - Command to execute
   * @return {Promise<void>} Nothing when complete
   */
  public async execute(command: DeleteLabelCommand): Promise<void> {
    return void (await this.octokit.graphql({
      input: { clientMutationId: this.config.get('id'), id: command.id },
      query: this.operation
    }))
  }
}

export default DeleteLabelHandler
