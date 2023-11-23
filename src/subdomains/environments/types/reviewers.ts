/**
 * @file Type Definitions - Reviewers
 * @module repostructure/environments/types/Reviewers
 */

import type { Team } from '#src/teams/types'
import type { User } from '#src/users/types'

/**
 * Users and teams that can approve deployments.
 */
type Reviewers = {
  /**
   * Team slugs.
   *
   * @see {@linkcode Team.slug}
   *
   * @default []
   */
  teams: Team['slug'][]

  /**
   * User logins.
   *
   * @see {@linkcode User.login}
   *
   * @default []
   */
  users: User['login'][]
}

export type { Reviewers as default }
