/**
 * @file Commands - UpdateLabelHandler
 * @module repostructure/labels/commands/UpdateLabelHandler
 */

import type { Config } from '#src/config'
import type { Label } from '#src/labels/types'
import { Octokit } from '#src/octokit'
import { ConfigService } from '@nestjs/config'
import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs'
import * as graphql from 'graphql'
import gql from 'graphql-tag'
import UpdateLabelCommand from './update.command'

/**
 * Label update command handler.
 *
 * @see {@linkcode Label}
 * @see {@linkcode UpdateLabelCommand}
 *
 * @class
 * @implements {ICommandHandler<UpdateLabelCommand, Label>}
 */
@CommandHandler(UpdateLabelCommand)
class UpdateLabelHandler implements ICommandHandler<UpdateLabelCommand, Label> {
  /**
   * GraphQL mutation.
   *
   * @see https://docs.github.com/graphql/reference/mutations#updatelabel
   *
   * @protected
   * @readonly
   * @instance
   * @member {string} operation
   */
  protected readonly operation: string

  /**
   * Create a new label update command handler.
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
      mutation UpdateLabel($input: UpdateLabelInput!) {
        payload: updateLabel(input: $input) {
          label {
            id
            name
           }
        }
      }
    `)
  }

  /**
   * Execute a label update command.
   *
   * @see {@linkcode Label}
   * @see {@linkcode UpdateLabelCommand}
   *
   * @public
   * @async
   *
   * @param {UpdateLabelCommand} command - Command to execute
   * @return {Promise<Label>} Updated label
   */
  public async execute(command: UpdateLabelCommand): Promise<Label> {
    const { payload } = await this.octokit.graphql<{ label: Label }>({
      input: { ...command, clientMutationId: this.config.get<string>('id') },
      query: this.operation
    })

    return payload.label
  }
}

export default UpdateLabelHandler
