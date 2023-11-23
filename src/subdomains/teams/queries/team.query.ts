/**
 * @file Queries - TeamQuery
 * @module repostructure/teams/queries/TeamQuery
 */

import { OrganizationQuery } from '#src/queries'
import type { Team } from '#src/teams/types'

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
   * @see {@linkcode Team.slug}
   *
   * @public
   * @instance
   * @member {Team['slug']} team
   */
  public team: Team['slug']

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
