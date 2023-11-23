/**
 * @file Queries - TeamsQuery
 * @module repostructure/teams/queries/TeamsQuery
 */

import { OrganizationQuery } from '#src/queries'
import type { Team } from '#src/teams/types'

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
   * @see {@linkcode Team.slug}
   *
   * @public
   * @instance
   * @member {Team['slug'][]} teams
   */
  public teams: Team['slug'][]

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
