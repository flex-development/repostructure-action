/**
 * @file Test Type Definitions - QueryVariables
 * @module tests/types/QueryVariables
 */

import type { Nullable } from '@flex-development/tutils'

/**
 * GraphQL query variables.
 */
type QueryVariables = {
  /**
   * Pagination cursor.
   */
  cursor?: Nullable<string>

  /**
   * Repository owner.
   */
  owner: string

  /**
   * Repository name.
   */
  repo: string
}

export type { QueryVariables as default }
