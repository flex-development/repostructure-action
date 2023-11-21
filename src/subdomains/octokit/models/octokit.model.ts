/**
 * @file Models - Octokit
 * @module repostructure/octokit/models/Octokit
 */

import * as octokit from '@octokit/core'
import type {
  OctokitOptions,
  OctokitPlugin
} from '@octokit/core/dist-types/types'
import {
  paginateGraphql,
  type GraphQLPaginate
} from '@octokit/plugin-paginate-graphql'
import { restEndpointMethods } from '@octokit/plugin-rest-endpoint-methods'
import type {
  RestEndpointMethods
} from '@octokit/plugin-rest-endpoint-methods/dist-types/generated/method-types'

/**
 * Octokit client.
 *
 * @class
 * @extends {octokit.Octokit}
 */
class Octokit extends octokit.Octokit {
  /**
   * Octokit plugins.
   *
   * @see {@linkcode OctokitPlugin}
   *
   * @public
   * @static
   * @override
   * @member {OctokitPlugin[]} plugins
   */
  public static override plugins: OctokitPlugin[] = [
    paginateGraphql,
    restEndpointMethods
  ]

  /**
   * GraphQL plugin instance.
   *
   * @see {@linkcode GraphQLPaginate}
   * @see https://github.com/octokit/graphql.js
   * @see https://github.com/octokit/plugin-paginate-graphql.js
   *
   * @public
   * @readonly
   * @instance
   * @member {GraphQLPaginate} graphql
   */
  declare public readonly graphql: GraphQLPaginate

  /**
   * REST API endpoints plugin instance.
   *
   * @see {@linkcode RestEndpointMethods}
   * @see https://github.com/octokit/plugin-rest-endpoint-methods.js
   *
   * @public
   * @readonly
   * @instance
   * @member {RestEndpointMethods} rest
   */
  public readonly rest!: RestEndpointMethods

  /**
   * Create a new octokit client.
   *
   * @see {@linkcode OctokitOptions}
   *
   * @param {OctokitOptions?} [options={}] - Octokit options
   */
  constructor(options: OctokitOptions = {}) {
    super(options)

    for (const plugin of Octokit.plugins) {
      Object.assign(this, plugin(this, options))
    }
  }
}

export default Octokit
