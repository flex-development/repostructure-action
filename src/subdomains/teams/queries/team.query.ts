/**
 * @file Queries - TeamQuery
 * @module repostructure/teams/queries/TeamQuery
 */

/**
 * Team query.
 *
 * @class
 */
class TeamQuery {
  /**
   * Organization name.
   *
   * @public
   * @instance
   * @member {string} org
   */
  public org: string

  /**
   * Team slug.
   *
   * @public
   * @instance
   * @member {string} team
   */
  public team: string

  /**
   * Create a new team query.
   *
   * @param {TeamQuery} params - Query parameters
   */
  constructor(params: TeamQuery) {
    this.org = params.org
    this.team = params.team
  }
}
export default TeamQuery
