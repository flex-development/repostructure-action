/**
 * @file Test Utilities - connection
 * @module tests/utils/connection
 */

import api from '#fixtures/api.github.json' assert { type: 'json' }
import {
  at,
  cast,
  isNull,
  select,
  type Nilable,
  type ObjectPlain
} from '@flex-development/tutils'
import type { Connection } from '@octokit/graphql'
import { GraphQLError } from 'graphql'

/**
 * GraphQL connection names.
 */
type ConnectionKey = Exclude<
  keyof typeof api.graphql.repository,
  'id' | 'name' | 'nameWithOwner'
>

/**
 * Create a connection object.
 *
 * @template T - Node type
 *
 * @param {ConnectionKey} key - GraphQL connection name
 * @param {Nilable<string>?} [cursor=null] - Cursor of last node
 * @param {number?} [limit=10] - Node limit per page
 * @return {Connection<T>} Connection object
 * @throws {GraphQLError} If cursor is invalid
 */
const connection = <T extends ObjectPlain>(
  key: ConnectionKey,
  cursor: Nilable<string> = null,
  limit: number = 10
): Connection<T> => {
  const { edges, nodes } = api.graphql.repository[key]

  /**
   * Index of current edge.
   *
   * @const {number} i
   */
  const i: number = isNull(cursor)
    ? 0
    : select(edges, null, e => e.cursor).indexOf(cursor) + 1

  // throw on invalid cursor
  if (i === -1) {
    /**
     * Error message.
     *
     * @const {string} msg
     */
    const msg: string = `\`${cursor}\` does not appear to be a valid cursor.`

    // throw if cursor is invalid
    throw new GraphQLError(msg, {
      extensions: { type: 'INVALID_CURSOR_ARGUMENTS' }
    })
  }

  /**
   * Index of next edge.
   *
   * @var {number} j
   */
  const j: number = i + limit

  /**
   * Cursors from current edge to next edge.
   *
   * @const {{ cursor: string }[]} cursors
   */
  const cursors: { cursor: string }[] = edges.slice(i, j)

  return {
    nodes: cast(nodes.slice(i, j)),
    pageInfo: {
      endCursor: at(cursors, -1)?.cursor ?? cursor,
      hasNextPage: !!edges.slice(j, j + limit).length
    }
  }
}

export default connection
