/**
 * @file Queries - EnvironmentsHandler
 * @module repostructure/environments/queries/EnvironmentsHandler
 */

import type { Environment } from '#src/environments/types'
import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs'
import { Octokit } from '@octokit/core'
import * as graphql from 'graphql'
import gql from 'graphql-tag'
import EnvironmentsQuery from './environments.query'

/**
 * Repository environments query handler.
 *
 * @see {@linkcode Environment}
 * @see {@linkcode EnvironmentsQuery}
 *
 * @class
 * @implements {IQueryHandler<EnvironmentsQuery, Environment[]>}
 */
@QueryHandler(EnvironmentsQuery)
class EnvironmentsHandler
  implements IQueryHandler<EnvironmentsQuery, Environment[]> {
  /**
   * GraphQL query.
   *
   * @see https://docs.github.com/graphql/reference/queries#repository
   *
   * @protected
   * @readonly
   * @instance
   * @member {string} operation
   */
  protected readonly operation: string

  /**
   * Create a new repository environments query handler.
   *
   * @see {@linkcode Octokit}
   *
   * @param {Octokit} octokit - Hydrated octokit client
   */
  constructor(protected readonly octokit: Octokit) {
    this.operation = graphql.print(gql`
      query Environments($cursor: String, $owner: String!, $repo: String!) {
        payload: repository(name: $repo, owner: $owner) {
          environments(
            after: $cursor,
            first: 100,
            orderBy: { direction: ASC, field: NAME }
          ) {
            nodes {
              id
              name
            }
            pageInfo {
              endCursor
              hasNextPage
            }
          }
          id
        }
      }
    `)
  }

  /**
   * Execute a repository environments query.
   *
   * @see {@linkcode Environment}
   * @see {@linkcode EnvironmentsQuery}
   *
   * @public
   * @async
   *
   * @param {EnvironmentsQuery} query - Query to execute
   * @return {Promise<Environment[]>} Repository environments array
   */
  public async execute(query: EnvironmentsQuery): Promise<Environment[]> {
    const {
      payload
    } = await this.octokit.graphql.paginate<'environments', Environment>(
      this.operation,
      query
    )

    return payload.environments.nodes
  }
}

export default EnvironmentsHandler
