/**
 * @file Commands - UpdateBranchProtectionCommand
 * @module repostructure/branches/commands/UpdateBranchProtectionCommand
 */

import { BranchProtectionDTO } from '#src/branches/dto'

/**
 * Branch protection rule update command.
 *
 * @see {@linkcode BranchProtectionDTO}
 *
 * @class
 * @extends {BranchProtectionDTO}
 */
class UpdateBranchProtectionCommand extends BranchProtectionDTO {
  /**
   * Node ID of branch protection rule to update.
   *
   * @public
   * @readonly
   * @instance
   * @member {string} id
   */
  public readonly id: string

  /**
   * Update a new branch protection rule update command.
   *
   * @param {UpdateBranchProtectionCommand} params - Command parameters
   */
  constructor(params: UpdateBranchProtectionCommand) {
    super(params)
    this.id = params.id
  }
}

export default UpdateBranchProtectionCommand
