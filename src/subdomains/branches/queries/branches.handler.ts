/**
 * @file Queries - BranchesHandler
 * @module repostructure/branches/queries/BranchesHandler
 */

import type { Branch } from '#src/branches/types'
import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs'
import { Octokit } from '@octokit/core'
import * as graphql from 'graphql'
import gql from 'graphql-tag'
import BranchesQuery from './branches.query'

/**
 * Protected branches query handler.
 *
 * @see {@linkcode Branch}
 * @see {@linkcode BranchesQuery}
 *
 * @class
 * @implements {IQueryHandler<BranchesQuery, Branch[]>}
 */
@QueryHandler(BranchesQuery)
class BranchesHandler implements IQueryHandler<BranchesQuery, Branch[]> {
  /**
   * GraphQL query.
   *
   * @see https://docs.github.com/graphql/reference/objects#repository
   *
   * @protected
   * @readonly
   * @instance
   * @member {string} operation
   */
  protected readonly operation: string

  /**
   * Create a new protected branches query handler.
   *
   * @see {@linkcode Octokit}
   *
   * @param {Octokit} octokit - Hydrated octokit client
   */
  constructor(protected readonly octokit: Octokit) {
    this.operation = graphql.print(gql`
      query Branches($cursor: String, $owner: String!, $repo: String!) {
        payload: repository(name: $repo, owner: $owner) {
          branches: branchProtectionRules(after: $cursor, first: 100) {
            nodes {
              id
              pattern
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
   * Execute a protected branches query.
   *
   * @see {@linkcode Branch}
   * @see {@linkcode BranchesQuery}
   *
   * @public
   * @async
   *
   * @param {BranchesQuery} query - Query to execute
   * @return {Promise<Branch[]>} Protected branches array
   */
  public async execute(query: BranchesQuery): Promise<Branch[]> {
    const {
      payload
    } = await this.octokit.graphql.paginate<'branches', Branch>(
      this.operation,
      query
    )

    return payload.branches.nodes
  }
}

export default BranchesHandler
