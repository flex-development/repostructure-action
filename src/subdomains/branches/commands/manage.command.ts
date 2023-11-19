/**
 * @file Commands - ManageBranchProtectionsCommand
 * @module repostructure/branches/commands/ManageBranchProtectionsCommand
 */

import { select } from '@flex-development/tutils'
import CreateBranchProtectionCommand from './create.command'

/**
 * Branch protection rules management command.
 *
 * @class
 */
class ManageBranchProtectionsCommand {
  /**
   * Branch protection rules parsed from infrastructure file.
   *
   * @see {@linkcode CreateBranchProtectionCommand}
   *
   * @public
   * @readonly
   * @instance
   * @member {CreateBranchProtectionCommand[]} branches
   */
  public readonly branches: CreateBranchProtectionCommand[]

  /**
   * Create a new branch protection rules management command.
   *
   * @param {CreateBranchProtectionCommand[]} branches - Rules to manage
   */
  constructor(branches: CreateBranchProtectionCommand[]) {
    this.branches = select(branches, null, branch => {
      return new CreateBranchProtectionCommand(branch)
    })
  }
}

export default ManageBranchProtectionsCommand
