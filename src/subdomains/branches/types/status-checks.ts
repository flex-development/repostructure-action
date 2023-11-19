/**
 * @file Type Definitions - StatusChecks
 * @module repostructure/branches/types/StatusChecks
 */

import type { Nullable } from '@flex-development/tutils'
import type StatusCheck from './status-check'

/**
 * Required status checks object.
 */
type StatusChecks = {
  /**
   * Required status checks list.
   *
   * @see {@linkcode StatusCheck}
   */
  checks: StatusCheck[]

  /**
   * Require branches to be up to date before merging.
   */
  strict?: Nullable<boolean>
}

export type { StatusChecks as default }
