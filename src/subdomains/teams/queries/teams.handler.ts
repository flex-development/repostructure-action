/**
 * @file Queries - TeamsHandler
 * @module repostructure/teams/queries/TeamsHandler
 */

import type { Team } from '#src/teams/types'
import { reduceAsync } from '@flex-development/tutils'
import { QueryBus, QueryHandler, type IQueryHandler } from '@nestjs/cqrs'
import TeamQuery from './team.query'
import TeamsQuery from './teams.query'

/**
 * Teams query handler.
 *
 * @see {@linkcode Team}
 * @see {@linkcode TeamsQuery}
 *
 * @class
 * @implements {IQueryHandler<TeamsQuery, Team[]>}
 */
@QueryHandler(TeamsQuery)
class TeamsHandler implements IQueryHandler<TeamsQuery, Team[]> {
  /**
   * Create a new teams query handler.
   *
   * @see {@linkcode QueryBus}
   *
   * @param {QueryBus} queries - Query bus
   */
  constructor(protected readonly queries: QueryBus) {}

  /**
   * Execute a teams query.
   *
   * @see {@linkcode Team}
   * @see {@linkcode TeamsQuery}
   *
   * @public
   * @async
   *
   * @param {TeamsQuery} query - Query to execute
   * @return {Promise<Team[]>} Team objects array
   */
  public async execute(query: TeamsQuery): Promise<Team[]> {
    return reduceAsync(query.teams, async (acc, team) => [
      ...acc,
      await this.queries.execute(new TeamQuery({ org: query.org, team }))
    ], <Team[]>[])
  }
}

export default TeamsHandler
