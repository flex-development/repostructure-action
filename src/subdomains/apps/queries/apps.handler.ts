/**
 * @file Queries - AppsHandler
 * @module repostructure/apps/queries/AppsHandler
 */

import type { App } from '#src/apps/types'
import { reduceAsync } from '@flex-development/tutils'
import { QueryBus, QueryHandler, type IQueryHandler } from '@nestjs/cqrs'
import AppQuery from './app.query'
import AppsQuery from './apps.query'

/**
 * GitHub Apps query handler.
 *
 * @see {@linkcode App}
 * @see {@linkcode AppsQuery}
 *
 * @class
 * @implements {IQueryHandler<AppsQuery, App[]>}
 */
@QueryHandler(AppsQuery)
class AppsHandler implements IQueryHandler<AppsQuery, App[]> {
  /**
   * Create a new GitHub Apps query handler.
   *
   * @see {@linkcode QueryBus}
   *
   * @param {QueryBus} queries - Query bus
   */
  constructor(protected readonly queries: QueryBus) {}

  /**
   * Execute a GitHub Apps query.
   *
   * @see {@linkcode App}
   * @see {@linkcode AppsQuery}
   *
   * @public
   * @async
   *
   * @param {AppsQuery} query - Query to execute
   * @return {Promise<App[]>} GitHub App objects array
   */
  public async execute(query: AppsQuery): Promise<App[]> {
    return reduceAsync(query.apps, async (acc, app) => [
      ...acc,
      await this.queries.execute(new AppQuery({ app }))
    ], <App[]>[])
  }
}

export default AppsHandler
