/**
 * @file Commands - DeleteBranchProtectionCommand
 * @module repostructure/branches/commands/DeleteBranchProtectionCommand
 */

import type { BranchProtection } from '#src/branches/types'

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
   * @see {@linkcode BranchProtection.id}
   *
   * @public
   * @readonly
   * @instance
   * @member {BranchProtection['id']} id
   */
  public readonly id: BranchProtection['id']

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
