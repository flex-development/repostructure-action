/**
 * @file Test Utilities - GQLResponse
 * @module tests/utils/GQLResponse
 */

import data from '#fixtures/api.github.com/graphql.json' assert { type: 'json' }
import type { GQLError } from '#tests/types'
import {
  at,
  isNull,
  select,
  type Nullable,
  type ObjectCurly
} from '@flex-development/tutils'
import type { GQLPaginated } from '@octokit/plugin-paginate-graphql'
import { HttpResponse, type StrictResponse } from 'msw'

/**
 * Paginated data names.
 */
type PaginateKey = Exclude<keyof typeof data.data.repository, 'id'>

/**
 * Pagination options.
 */
type PaginateOptions = {
  /**
   * Cursor of last node.
   *
   * @default null
   */
  cursor?: Nullable<string>

  /**
   * Paginated data key.
   */
  key: PaginateKey
}

/**
 * Paginated data object.
 *
 * @template K - Paginated data name
 * @template T - Paginated data type
 */
type PaginatedDataObject<K extends string, T extends ObjectCurly> =
  | { data: { payload: null }; errors: GQLError[] }
  | { data: GQLPaginated<K, T> }

/**
 * GraphQL-specific response object mock.
 *
 * @see {@linkcode HttpResponse}
 *
 * @class
 * @extends {HttpResponse}
 */
class GQLResponse extends HttpResponse {
  /**
   * Create a paginated {@linkcode Response}.
   *
   * @public
   * @static
   *
   * @template K - Paginated data name
   * @template T - Paginated data type
   *
   * @param {PaginateOptions} options - Pagination options
   * @return {StrictResponse<PaginatedDataObject<K, T>>} Paginated response
   */
  public static paginate<
    K extends PaginateKey,
    T extends ObjectCurly
  >(options: PaginateOptions): StrictResponse<PaginatedDataObject<K, T>> {
    const { cursor = null, key } = options
    const { edges, nodes } = data.data.repository[key]

    /**
     * Index of current edge.
     *
     * @const {number} i
     */
    const i: number = isNull(cursor)
      ? 0
      : select(edges, null, e => e.cursor).indexOf(cursor) + 1

    // return error response if cursor is invalid
    if (i === -1) {
      return this.json({
        data: { payload: null },
        errors: [
          {
            locations: [{ column: -1, line: -1 }],
            message: `\`${cursor}\` does not appear to be a valid cursor.`,
            path: ['payload', key, 'edges'],
            type: 'INVALID_CURSOR_ARGUMENTS'
          }
        ]
      })
    }

    /**
     * Index of next edge.
     *
     * @var {number} j
     */
    const j: number = i + 10

    /**
     * Cursors from current edge to next edge.
     *
     * @const {{ cursor: string }[]} cursors
     */
    const cursors: { cursor: string }[] = edges.slice(i, j)

    return this.json({
      data: {
        payload: <T>{
          [key]: {
            nodes: nodes.slice(i, j),
            pageInfo: {
              endCursor: at(cursors, -1)?.cursor ?? cursor,
              hasNextPage: !!cursors.length
            }
          }
        }
      }
    })
  }
}

export default GQLResponse
