/**
 * @file Queries - UserQuery
 * @module repostructure/users/queries/UserQuery
 */

/**
 * GitHub user query.
 *
 * @class
 */
class UserQuery {
  /**
   * User login.
   *
   * @public
   * @instance
   * @member {string} login
   */
  public login: string

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
