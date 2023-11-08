/**
 * @file Queries - LabelsQueryHandler
 * @module repostructure/labels/queries/LabelsQueryHandler
 */

import type { Label } from '#src/labels/types'
import { isNull, type Nullable } from '@flex-development/tutils'
import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs'
import { Octokit } from '@octokit/core'
import type { Repository as Payload } from '@octokit/graphql-schema'
import * as graphql from 'graphql'
import gql from 'graphql-tag'
import LabelsQuery from './labels.query'

/**
 * Repository labels query handler.
 *
 * @see {@linkcode Label}
 * @see {@linkcode LabelsQuery}
 *
 * @class
 * @implements {IQueryHandler<LabelsQuery, Label[]>}
 */
@QueryHandler(LabelsQuery)
class LabelsQueryHandler implements IQueryHandler<LabelsQuery, Label[]> {
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
   * Create a new repository labels query handler.
   *
   * @see {@linkcode Octokit}
   *
   * @param {Octokit} octokit - Hydrated octokit client
   */
  constructor(protected readonly octokit: Octokit) {
    this.operation = graphql.print(gql`
      query ($cursor: String, $owner: String!, $repo: String!) {
        payload: repository(name: $repo, owner: $owner) {
          labels(
            after: $cursor,
            first: 100,
            orderBy: { direction: ASC, field: NAME }
          ) {
            nodes {
              color
              description
              id
              name
            }
            pageInfo {
              endCursor
            }
          }
        }
      }
    `)
  }

  /**
   * Execute a repository labels query.
   *
   * @see {@linkcode Label}
   * @see {@linkcode LabelsQuery}
   *
   * @public
   * @async
   *
   * @param {LabelsQuery} query - Query to execute
   * @return {Promise<Label[]>} Repository labels array
   */
  public async execute(query: LabelsQuery): Promise<Label[]> {
    /**
     * Pagination cursor.
     *
     * @var {Nullable<string>} cursor
     */
    let cursor: Nullable<string> = ''

    /**
     * Repository labels.
     *
     * @var {Label[]} labels
     */
    let labels: Label[] = []

    // get repository labels
    while (!isNull(cursor)) {
      const { payload }: { payload: Payload } = await this.octokit.graphql({
        cursor,
        owner: query.owner,
        query: this.operation,
        repo: query.repo
      })

      labels = [...labels, ...<Label[]>payload.labels!.nodes!]
      cursor = payload.labels!.pageInfo.endCursor!
    }

    return labels
  }
}

export default LabelsQueryHandler
