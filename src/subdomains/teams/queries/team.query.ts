/**
 * @file Queries - TeamQuery
 * @module repostructure/teams/queries/TeamQuery
 */

import { OrganizationQuery } from '#src/queries'

/**
 * Team query.
 *
 * @class
 * @extends {OrganizationQuery}
 */
class TeamQuery extends OrganizationQuery {
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
    super(params)
    this.team = params.team
  }
}
export default TeamQuery
