/**
 * @file Commands - DeleteEnvironmentCommand
 * @module repostructure/environments/commands/DeleteEnvironmentCommand
 */

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
   * @public
   * @readonly
   * @instance
   * @member {string} id
   */
  public readonly id: string

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
