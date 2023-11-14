/**
 * @file Type Definitions - User
 * @module repostructure/users/types/User
 */

/**
 * GitHub user object.
 *
 * @see https://docs.github.com/graphql/reference/objects#user
 */
type User = {
  /**
   * Node ID of user.
   */
  readonly id: string

  /**
   * User login.
   */
  readonly login: string
}

export type { User as default }
