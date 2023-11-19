/**
 * @file Type Definitions - StatusCheck
 * @module repostructure/branches/types/StatusCheck
 */

import type { Nullable } from '@flex-development/tutils'

/**
 * Required status check object.
 */
type StatusCheck = {
  /**
   * Slug of GitHub App that must provide check.
   *
   * @default 'github-actions'
   */
  app?: Nullable<string>

  /**
   * Status check name.
   */
  context: string
}

export type { StatusCheck as default }
