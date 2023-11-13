/**
 * @file Queries - RepositoryQuery
 * @module repostructure/queries/RepositoryQuery
 */

/**
 * Repository query.
 *
 * @class
 */
class RepositoryQuery {
  /**
   * Repository owner.
   *
   * @public
   * @instance
   * @member {string} owner
   */
  public owner: string

  /**
   * Repository name.
   *
   * @public
   * @instance
   * @member {string} repo
   */
  public repo: string

  /**
   * Create a new repository query.
   *
   * @param {RepositoryQuery} params - Query parameters
   */
  constructor(params: RepositoryQuery) {
    this.owner = params.owner
    this.repo = params.repo
  }
}

export default RepositoryQuery
