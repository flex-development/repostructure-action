/**
 * @file Commands - CreateLabelHandler
 * @module repostructure/labels/commands/CreateLabelHandler
 */

import type { Config } from '#src/config'
import type { Label } from '#src/labels/types'
import { fallback, isNull, shake } from '@flex-development/tutils'
import { ConfigService } from '@nestjs/config'
import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs'
import { Octokit } from '@octokit/core'
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
   * REST API endpoint.
   *
   * @see https://docs.github.com/rest/issues/labels#create-a-label
   *
   * @protected
   * @readonly
   * @instance
   * @member {'POST /repos/{owner}/{repo}/labels'} endpoint
   */
  protected readonly endpoint: 'POST /repos/{owner}/{repo}/labels'

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
    this.endpoint = 'POST /repos/{owner}/{repo}/labels'
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
      data: {
        color,
        description,
        name,
        node_id: id
      }
    } = await this.octokit.request(this.endpoint, shake({
      color: command.color,
      description: fallback(command.description, undefined, isNull),
      name: command.name,
      owner: this.config.get<string>('owner'),
      repo: this.config.get<string>('repo')
    }))

    return { color, description, id, name }
  }
}

export default CreateLabelHandler
