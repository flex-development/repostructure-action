/**
 * @file Commands - CreateBranchProtectionCommand
 * @module repostructure/branches/commands/CreateBranchProtectionCommand
 */

import { BranchProtectionDTO } from '#src/branches/dto'

/**
 * Branch protection rule creation command.
 *
 * @see {@linkcode BranchProtectionDTO}
 *
 * @class
 * @extends {BranchProtectionDTO}
 */
class CreateBranchProtectionCommand extends BranchProtectionDTO {
  /**
   * Glob-like pattern used to determine protected branches.
   *
   * @example
   *  'main'
   * @example
   *  'release/*'
   *
   * @public
   * @readonly
   * @instance
   * @member {string} branch
   */
  public readonly branch: string

  /**
   * Create a new branch protection rule creation command.
   *
   * @param {CreateBranchProtectionCommand} params - Command parameters
   */
  constructor(params: CreateBranchProtectionCommand) {
    super(params)
    this.branch = params.branch
  }
}

export default CreateBranchProtectionCommand
