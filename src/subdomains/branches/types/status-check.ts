/**
 * @file Type Definitions - StatusCheck
 * @module repostructure/branches/types/StatusCheck
 */

import type { App } from '#src/apps/types'
import type { Nullable } from '@flex-development/tutils'

/**
 * Required status check object.
 */
type StatusCheck = {
  /**
   * Slug of GitHub App that must provide check.
   *
   * @see {@linkcode App.slug}
   *
   * @default 'github-actions'
   */
  app?: Nullable<App['slug']>

  /**
   * Status check name.
   */
  context: string
}

export type { StatusCheck as default }
