/**
 * @file Type Definitions - BranchActors
 * @module repostructure/branches/types/BranchActors
 */

import type { App } from '#src/apps/types'
import type { Team } from '#src/teams/types'
import type { User } from '#src/users/types'
import type { Nullable } from '@flex-development/tutils'

/**
 * Branch actors object.
 *
 * @see https://docs.github.com/graphql/reference/unions#branchactorallowanceactor
 */
type BranchActors = {
  /**
   * App slugs.
   *
   * @see {@linkcode App.slug}
   */
  apps?: Nullable<App['slug'][]>

  /**
   * Team slugs.
   *
   * @see {@linkcode Team.slug}
   */
  teams?: Nullable<Team['slug'][]>

  /**
   * User logins.
   *
   * @see {@linkcode User.login}
   */
  users?: Nullable<User['login'][]>
}

export type { BranchActors as default }
