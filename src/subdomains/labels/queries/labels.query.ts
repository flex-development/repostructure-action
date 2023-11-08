/**
 * @file Queries - LabelsQuery
 * @module repostructure/labels/queries/LabelsQuery
 */

/**
 * Repository labels query.
 *
 * @class
 */
class LabelsQuery {
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
   * Create a new repository labels query.
   *
   * @param {LabelsQuery} params - Query parameters
   */
  constructor(params: LabelsQuery) {
    this.owner = params.owner
    this.repo = params.repo
  }
}

export default LabelsQuery
