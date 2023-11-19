/**
 * @file Type Definitions - Deployments
 * @module repostructure/branches/types/Deployments
 */

import type { Environment } from '#src/environments/types'
import type { Nullable } from '@flex-development/tutils'

/**
 * Deployment requirements object.
 */
type Deployments = {
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

export type { Deployments as default }
