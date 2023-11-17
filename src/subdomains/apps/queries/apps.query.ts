/**
 * @file Queries - AppsQuery
 * @module repostructure/apps/queries/AppsQuery
 */

/**
 * GitHub Apps query.
 *
 * @class
 */
class AppsQuery {
  /**
   * GitHub App slugs.
   *
   * @public
   * @instance
   * @member {string[]} apps
   */
  public apps: string[]

  /**
   * Create a new GitHub Apps query.
   *
   * @param {AppsQuery} params - Query parameters
   */
  constructor(params: AppsQuery) {
    this.apps = params.apps
  }
}

export default AppsQuery
