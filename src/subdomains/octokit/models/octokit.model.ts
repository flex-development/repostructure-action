/**
 * @file Models - Octokit
 * @module repostructure/octokit/models/Octokit
 */

import { set } from '@flex-development/tutils'
import * as octokit from '@octokit/core'
import type { OctokitOptions } from '@octokit/core/dist-types/types'
import { graphql } from '@octokit/graphql'
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
   * GraphQL plugin.
   *
   * @see {@linkcode GraphQLPaginate}
   * @see https://github.com/octokit/graphql.js
   * @see https://github.com/octokit/plugin-paginate-graphql.js
   *
   * @public
   * @override
   * @readonly
   * @instance
   * @member {GraphQLPaginate} graphql
   */
  public override readonly graphql: GraphQLPaginate

  /**
   * REST API endpoints plugin.
   *
   * @see {@linkcode RestEndpointMethods}
   * @see https://github.com/octokit/plugin-rest-endpoint-methods.js
   *
   * @public
   * @readonly
   * @instance
   * @member {RestEndpointMethods} graphql
   */
  public readonly rest: RestEndpointMethods

  /**
   * Create a new octokit client.
   *
   * @see {@linkcode OctokitOptions}
   *
   * @param {OctokitOptions?} [options={}] - Octokit options
   */
  constructor(options: OctokitOptions = {}) {
    super(options)
    this.graphql = paginateGraphql(set(this, 'graphql', graphql)).graphql
    this.rest = restEndpointMethods(this).rest
  }
}

export default Octokit
