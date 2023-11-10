/**
 * @file Commands - CreateLabelHandler
 * @module repostructure/labels/commands/CreateLabelHandler
 */

import type { Config } from '#src/config'
import type { Label } from '#src/labels/types'
import { ConfigService } from '@nestjs/config'
import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs'
import { Octokit } from '@octokit/core'
import * as graphql from 'graphql'
import gql from 'graphql-tag'
import CreateLabelCommand from './create.command'

/**
 * Label creation command handler.
 *
 * @see {@linkcode CreateLabelCommand}
 * @see {@linkcode Label}
 *
 * @class
 * @implements {ICommandHandler<CreateLabelCommand, Label>}
 */
@CommandHandler(CreateLabelCommand)
class CreateLabelHandler implements ICommandHandler<CreateLabelCommand, Label> {
  /**
   * GraphQL mutation.
   *
   * @see https://docs.github.com/graphql/reference/mutations#createlabel
   *
   * @protected
   * @readonly
   * @instance
   * @member {string} operation
   */
  protected readonly operation: string

  /**
   * Create a new label creation command handler.
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
      mutation ($input: CreateLabelInput!) {
        payload: createLabel(input: $input) {
          label {
            color
            description
            id
            name
           }
        }
      }
    `)
  }

  /**
   * Execute a label creation command.
   *
   * @see {@linkcode CreateLabelCommand}
   * @see {@linkcode Label}
   *
   * @public
   * @async
   *
   * @param {CreateLabelCommand} command - Command to execute
   * @return {Promise<Label>} New label
   */
  public async execute(command: CreateLabelCommand): Promise<Label> {
    const {
      payload
    } = await this.octokit.graphql<{ payload: { label: Label } }>({
      input: {
        ...command,
        clientMutationId: this.config.get<string>('id'),
        repositoryId: this.config.get<string>('node_id')
      },
      query: this.operation
    })

    return payload.label
  }
}

export default CreateLabelHandler
