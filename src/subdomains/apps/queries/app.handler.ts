/**
 * @file Queries - AppHandler
 * @module repostructure/apps/queries/AppHandler
 */

import type { App } from '#src/apps/types'
import { Octokit } from '#src/octokit'
import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs'
import AppQuery from './app.query'

/**
 * GitHub App query handler.
 *
 * @see {@linkcode App}
 * @see {@linkcode AppQuery}
 *
 * @class
 * @implements {IQueryHandler<AppQuery, App>}
 */
@QueryHandler(AppQuery)
class AppHandler implements IQueryHandler<AppQuery, App> {
  /**
   * Create a new GitHub App query handler.
   *
   * @see {@linkcode Octokit}
   *
   * @param {Octokit} octokit - Hydrated octokit client
   */
  constructor(protected readonly octokit: Octokit) {}

  /**
   * Execute a GitHub App query.
   *
   * @see {@linkcode App}
   * @see {@linkcode AppQuery}
   *
   * @public
   * @async
   *
   * @param {AppQuery} query - Query to execute
   * @return {Promise<App>} GitHub App object
   */
  public async execute(query: AppQuery): Promise<App> {
    const {
      data: {
        node_id,
        slug
      }
    } = await this.octokit.rest.apps.getBySlug({ app_slug: query.app })

    return { id: node_id, slug: slug! }
  }
}

export default AppHandler
