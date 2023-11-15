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
   * @public
   * @instance
   * @member {string[]} logins
   */
  public logins: string[]

  /**
   * Create a new GitHub users query.
   *
   * @param {UsersQuery} params - Query parameters
   */
  constructor(params: UsersQuery) {
    this.logins = params.logins
  }
}

export default UsersQuery
