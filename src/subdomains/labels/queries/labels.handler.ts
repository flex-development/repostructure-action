/**
 * @file Queries - LabelsHandler
 * @module repostructure/labels/queries/LabelsHandler
 */

import type { Label } from '#src/labels/types'
import { Octokit } from '#src/octokit'
import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs'
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
class LabelsHandler implements IQueryHandler<LabelsQuery, Label[]> {
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
      query Labels($cursor: String, $owner: String!, $repo: String!) {
        payload: repository(name: $repo, owner: $owner) {
          id
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
              hasNextPage
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
    const {
      payload
    } = await this.octokit.graphql.paginate<'labels', Label>(
      this.operation,
      query
    )

    return payload.labels.nodes
  }
}

export default LabelsHandler
