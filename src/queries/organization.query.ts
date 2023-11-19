/**
 * @file Queries - OrganizationQuery
 * @module repostructure/queries/OrganizationQuery
 */

/**
 * Organization query.
 *
 * @class
 */
class OrganizationQuery {
  /**
   * Organization name.
   *
   * @public
   * @instance
   * @member {string} org
   */
  public org: string

  /**
   * Create a new organization query.
   *
   * @param {OrganizationQuery} params - Query parameters
   */
  constructor(params: OrganizationQuery) {
    this.org = params.org
  }
}

export default OrganizationQuery
