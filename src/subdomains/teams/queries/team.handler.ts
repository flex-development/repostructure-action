/**
 * @file Queries - TeamHandler
 * @module repostructure/teams/queries/TeamHandler
 */

import type { Team } from '#src/teams/types'
import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs'
import { Octokit } from '@octokit/core'
import TeamQuery from './team.query'

/**
 * Team query handler.
 *
 * @see {@linkcode Team}
 * @see {@linkcode TeamQuery}
 *
 * @class
 * @implements {IQueryHandler<TeamQuery, Team>}
 */
@QueryHandler(TeamQuery)
class TeamHandler implements IQueryHandler<TeamQuery, Team> {
  /**
   * REST API endpoint.
   *
   * @see https://docs.github.com/rest/teams/teams#get-a-team-by-name
   *
   * @protected
   * @readonly
   * @instance
   * @member {'GET /orgs/{org}/teams/{team_slug}'} endpoint
   */
  protected readonly endpoint: 'GET /orgs/{org}/teams/{team_slug}'

  /**
   * Create a new team query handler.
   *
   * @see {@linkcode Octokit}
   *
   * @param {Octokit} octokit - Hydrated octokit client
   */
  constructor(protected readonly octokit: Octokit) {
    this.endpoint = 'GET /orgs/{org}/teams/{team_slug}'
  }

  /**
   * Execute a team query.
   *
   * @see {@linkcode Team}
   * @see {@linkcode TeamQuery}
   *
   * @public
   * @async
   *
   * @param {TeamQuery} query - Query to execute
   * @return {Promise<Team>} Team object
   */
  public async execute(query: TeamQuery): Promise<Team> {
    const { data } = await this.octokit.request(this.endpoint, {
      org: query.org,
      team_slug: query.team
    })

    return { id: data.node_id, slug: data.slug }
  }
}

export default TeamHandler
