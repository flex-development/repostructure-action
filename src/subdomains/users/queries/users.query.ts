/**
 * @file Queries - UsersQuery
 * @module repostructure/users/queries/UsersQuery
 */

import type { User } from '#src/users/types'

/**
 * GitHub users query.
 *
 * @class
 */
class UsersQuery {
  /**
   * User logins.
   *
   * @see {@linkcode User.login}
   *
   * @default []
   *
   * @public
   * @instance
   * @member {User['login'][]} users
   */
  public users: User['login'][]

  /**
   * Create a new GitHub users query.
   *
   * @param {UsersQuery} params - Query parameters
   */
  constructor(params: UsersQuery) {
    this.users = params.users
  }
}

export default UsersQuery
