/**
 * @file Queries - TeamsQuery
 * @module repostructure/teams/queries/TeamsQuery
 */

import { OrganizationQuery } from '#src/queries'

/**
 * Teams query.
 *
 * @class
 * @extends {OrganizationQuery}
 */
class TeamsQuery extends OrganizationQuery {
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
    super(params)
    this.teams = params.teams
  }
}
export default TeamsQuery
