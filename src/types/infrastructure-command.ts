/**
 * @file Type Definitions - InfrastructureCommand
 * @module repostructure/types/InfrastructureCommand
 */

import type { ManageEnvironmentsCommand } from '#src/environments'
import type { ManageLabelsCommand } from '#src/labels'

/**
 * Infrastructure management command type.
 */
type InfrastructureCommand = ManageEnvironmentsCommand | ManageLabelsCommand

export type { InfrastructureCommand as default }
