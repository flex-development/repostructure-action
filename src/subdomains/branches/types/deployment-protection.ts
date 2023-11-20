/**
 * @file Type Definitions - DeploymentProtection
 * @module repostructure/branches/types/DeploymentProtection
 */

import type { Environment } from '#src/environments/types'
import type { Nullable } from '@flex-development/tutils'

/**
 * Deployment environment protections object.
 */
type DeploymentProtection = {
  /**
   * Environments that must be successfully deployed before branches can be
   * merged into a protected branch.
   *
   * @see {@linkcode Environment}
   */
  environments: Environment['name'][]

  /**
   * Require successful deployments.
   */
  strict?: Nullable<boolean>
}

export type { DeploymentProtection as default }
