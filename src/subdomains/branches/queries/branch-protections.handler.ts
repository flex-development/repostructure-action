/**
 * @file Queries - BranchProtectionsHandler
 * @module repostructure/branches/queries/BranchProtectionsHandler
 */

import type { BranchProtection } from '#src/branches/types'
import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs'
import { Octokit } from '@octokit/core'
import * as graphql from 'graphql'
import gql from 'graphql-tag'
import BranchProtectionsQuery from './branch-protections.query'

/**
 * Branch protection rules query handler.
 *
 * @see {@linkcode BranchProtection}
 * @see {@linkcode BranchProtectionsQuery}
 *
 * @class
 * @implements {IQueryHandler<BranchProtectionsQuery, BranchProtection[]>}
 */
@QueryHandler(BranchProtectionsQuery)
class BranchProtectionsHandler
  implements IQueryHandler<BranchProtectionsQuery, BranchProtection[]> {
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
   * Create a new branch protection rules query handler.
   *
   * @see {@linkcode Octokit}
   *
   * @param {Octokit} octokit - Hydrated octokit client
   */
  constructor(protected readonly octokit: Octokit) {
    this.operation = graphql.print(gql`
      query BranchProtections(
        $cursor: String,
        $owner: String!,
        $repo: String!
      ) {
        payload: repository(name: $repo, owner: $owner) {
          id
          protections: branchProtectionRules(after: $cursor, first: 100) {
            nodes {
              id
              pattern
            }
            pageInfo {
              endCursor
              hasNextPage
            }
          }
        }
      }
    `)
  }

  /**
   * Execute a branch protection rules query.
   *
   * @see {@linkcode BranchProtection}
   * @see {@linkcode BranchProtectionsQuery}
   *
   * @public
   * @async
   *
   * @param {BranchProtectionsQuery} query - Query to execute
   * @return {Promise<BranchProtection[]>} Branch protection rules array
   */
  public async execute(
    query: BranchProtectionsQuery
  ): Promise<BranchProtection[]> {
    const {
      payload
    } = await this.octokit.graphql.paginate<'protections', BranchProtection>(
      this.operation,
      query
    )

    return payload.protections.nodes
  }
}

export default BranchProtectionsHandler
