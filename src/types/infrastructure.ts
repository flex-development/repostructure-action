/**
 * @file Type Definitions - Infrastructure
 * @module repostructure/types/Infrastructure
 */

import type { CreateBranchProtectionCommand } from '#src/branches'
import type { CreateEnvironmentCommand } from '#src/environments'
import type { CreateLabelCommand } from '#src/labels'
import type { ManageSecurityCommand } from '#src/security'

/**
 * Repository infrastructure object.
 */
type Infrastructure = {
  /**
   * Branch protections.
   *
   * @see {@linkcode CreateBranchProtectionCommand}
   */
  branches: CreateBranchProtectionCommand[]

  /**
   * Deployment environments.
   *
   * @see {@linkcode CreateEnvironmentCommand}
   */
  environments: CreateEnvironmentCommand[]

  /**
   * Repository labels.
   *
   * @see {@linkcode CreateLabelCommand}
   */
  labels: CreateLabelCommand[]

  /**
   * Repository security options.
   *
   * @see {@linkcode ManageSecurityCommand}
   */
  security: ManageSecurityCommand
}

export type { Infrastructure as default }
