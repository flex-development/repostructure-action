/**
 * @file Queries - UserQuery
 * @module repostructure/users/queries/UserQuery
 */

import type { User } from '#src/users/types'

/**
 * GitHub user query.
 *
 * @class
 */
class UserQuery {
  /**
   * User login.
   *
   * @see {@linkcode User.login}
   *
   * @public
   * @instance
   * @member {User['login']} login
   */
  public login: User['login']

  /**
   * Create a new GitHub user query.
   *
   * @param {UserQuery} params - Query parameters
   */
  constructor(params: UserQuery) {
    this.login = params.login
  }
}

export default UserQuery
