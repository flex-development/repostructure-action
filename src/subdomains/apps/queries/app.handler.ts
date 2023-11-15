/**
 * @file Queries - AppHandler
 * @module repostructure/apps/queries/AppHandler
 */

import type { App } from '#src/apps/types'
import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs'
import { Octokit } from '@octokit/core'
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
   * REST API endpoint.
   *
   * @see https://docs.github.com/rest/apps/apps#get-an-app
   *
   * @protected
   * @readonly
   * @instance
   * @member {'GET /apps/{app_slug}'} endpoint
   */
  protected readonly endpoint: 'GET /apps/{app_slug}'

  /**
   * Create a new GitHub App query handler.
   *
   * @see {@linkcode Octokit}
   *
   * @param {Octokit} octokit - Hydrated octokit client
   */
  constructor(protected readonly octokit: Octokit) {
    this.endpoint = 'GET /apps/{app_slug}'
  }

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
    const { app: app_slug } = query
    const { data } = await this.octokit.request(this.endpoint, { app_slug })
    return { id: data.node_id, slug: data.slug! }
  }
}

export default AppHandler
