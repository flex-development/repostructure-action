/**
 * @file Commands - DeleteEnvironmentCommand
 * @module repostructure/environments/commands/DeleteEnvironmentCommand
 */

import type { Environment } from '#src/environments/types'

/**
 * Environment deletion command.
 *
 * @see https://docs.github.com/graphql/reference/input-objects#deleteenvironmentinput
 *
 * @class
 */
class DeleteEnvironmentCommand {
  /**
   * Node ID of environment to delete.
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
   * Create a new environment deletion command.
   *
   * @param {DeleteEnvironmentCommand} params - Command parameters
   */
  constructor(params: DeleteEnvironmentCommand) {
    this.id = params.id
  }
}

export default DeleteEnvironmentCommand
