/**
 * @file Commands - DeleteBranchProtectionCommand
 * @module repostructure/branches/commands/DeleteBranchProtectionCommand
 */

/**
 * Branch protection rule deletion command.
 *
 * @see https://docs.github.com/graphql/reference/input-objects#deletebranchprotectionruleinput
 *
 * @class
 */
class DeleteBranchProtectionCommand {
  /**
   * Node ID of branch protection rule to delete.
   *
   * @public
   * @readonly
   * @instance
   * @member {string} id
   */
  public readonly id: string

  /**
   * Create a new branch protection rule deletion command.
   *
   * @param {DeleteBranchProtectionCommand} params - Command parameters
   */
  constructor(params: DeleteBranchProtectionCommand) {
    this.id = params.id
  }
}

export default DeleteBranchProtectionCommand
