/**
 * @file Queries - TeamsQuery
 * @module repostructure/teams/queries/TeamsQuery
 */

/**
 * Teams query.
 *
 * @class
 */
class TeamsQuery {
  /**
   * Organization name.
   *
   * @public
   * @instance
   * @member {string} org
   */
  public org: string

  /**
   * Team slugs.
   *
   * @public
   * @instance
   * @member {string[]} teams
   */
  public teams: string[]

  /**
   * Create a new teams query.
   *
   * @param {TeamsQuery} params - Query parameters
   */
  constructor(params: TeamsQuery) {
    this.org = params.org
    this.teams = params.teams
  }
}
export default TeamsQuery
