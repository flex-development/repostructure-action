/**
 * @file Type Definitions - BranchActors
 * @module repostructure/branches/types/BranchActors
 */

import type { Nullable } from '@flex-development/tutils'

/**
 * Branch actors object.
 *
 * @see https://docs.github.com/graphql/reference/unions#branchactorallowanceactor
 */
type BranchActors = {
  /**
   * App slugs.
   */
  apps?: Nullable<string[]>

  /**
   * Team slugs.
   */
  teams?: Nullable<string[]>

  /**
   * User logins.
   */
  users?: Nullable<string[]>
}

export type { BranchActors as default }
