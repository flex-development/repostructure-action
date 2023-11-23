/**
 * @file Commands - UpdateEnvironmentCommand
 * @module repostructure/environments/commands/UpdateEnvironmentCommand
 */

import { EnvironmentDTO } from '#src/environments/dto'
import type { Environment } from '#src/environments/types'

/**
 * Environment update command.
 *
 * @see {@linkcode EnvironmentDTO}
 *
 * @class
 * @extends {EnvironmentDTO}
 */
class UpdateEnvironmentCommand extends EnvironmentDTO {
  /**
   * Node ID of environment to update.
   *
   * @see {@linkcode Environment.id}
   *
   * @public
   * @readonly
   * @instance
   * @member {Environment["id"]} id
   */
  public readonly id: Environment['id']

  /**
   * Create a new environment update command.
   *
   * @param {UpdateEnvironmentCommand} params - Command parameters
   */
  constructor(params: UpdateEnvironmentCommand) {
    super(params)
    this.id = params.id
  }
}

export default UpdateEnvironmentCommand
