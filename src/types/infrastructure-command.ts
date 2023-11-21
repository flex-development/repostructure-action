/**
 * @file Type Definitions - InfrastructureCommand
 * @module repostructure/types/InfrastructureCommand
 */

import type { ManageBranchProtectionsCommand } from '#src/branches'
import type { ManageEnvironmentsCommand } from '#src/environments'
import type { ManageLabelsCommand } from '#src/labels'
import type { ManageSecurityCommand } from '#src/security'

/**
 * Infrastructure management command type.
 *
 * @see {@linkcode ManageBranchProtectionsCommand}
 * @see {@linkcode ManageEnvironmentsCommand}
 * @see {@linkcode ManageLabelsCommand}
 * @see {@linkcode ManageSecurityCommand}
 */
type InfrastructureCommand =
  | ManageBranchProtectionsCommand
  | ManageEnvironmentsCommand
  | ManageLabelsCommand
  | ManageSecurityCommand

export type { InfrastructureCommand as default }
