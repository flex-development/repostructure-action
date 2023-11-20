/**
 * @file Type Definitions - InfrastructureCommand
 * @module repostructure/types/InfrastructureCommand
 */

import type { ManageBranchProtectionsCommand } from '#src/branches'
import type { ManageEnvironmentsCommand } from '#src/environments'
import type { ManageLabelsCommand } from '#src/labels'

/**
 * Infrastructure management command type.
 *
 * @see {@linkcode ManageBranchProtectionsCommand}
 * @see {@linkcode ManageEnvironmentsCommand}
 * @see {@linkcode ManageLabelsCommand}
 */
type InfrastructureCommand =
  | ManageBranchProtectionsCommand
  | ManageEnvironmentsCommand
  | ManageLabelsCommand

export type { InfrastructureCommand as default }
