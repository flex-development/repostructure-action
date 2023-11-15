/**
 * @file Queries - AppQuery
 * @module repostructure/apps/queries/AppQuery
 */

/**
 * GitHub App query.
 *
 * @class
 */
class AppQuery {
  /**
   * URL-friendly name of GitHub App.
   *
   * @public
   * @instance
   * @member {string} app
   */
  public app: string

  /**
   * Create a new GitHub App query.
   *
   * @param {AppQuery} params - Query parameters
   */
  constructor(params: AppQuery) {
    this.app = params.app
  }
}

export default AppQuery
