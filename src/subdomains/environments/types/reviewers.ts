/**
 * @file Type Definitions - Reviewers
 * @module repostructure/environments/types/Reviewers
 */

/**
 * Users and teams that can approve deployments to an environment.
 */
type Reviewers = {
  /**
   * Team slugs.
   *
   * @default []
   */
  teams: string[]

  /**
   * User logins.
   *
   * @default []
   */
  users: string[]
}

export type { Reviewers as default }
