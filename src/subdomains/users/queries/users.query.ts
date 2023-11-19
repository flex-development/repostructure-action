/**
 * @file Queries - UsersQuery
 * @module repostructure/users/queries/UsersQuery
 */

/**
 * GitHub users query.
 *
 * @class
 */
class UsersQuery {
  /**
   * User logins.
   *
   * @default []
   *
   * @public
   * @instance
   * @member {string[]} users
   */
  public users: string[]

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
