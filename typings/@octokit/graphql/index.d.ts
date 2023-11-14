declare module '@octokit/graphql' {
  import type { Nullable, ObjectCurly } from '@flex-development/tutils'
  import type { RequestParameters } from '@octokit/types'

  /**
   * GraphQL connection object.
   *
   * @see https://docs.github.com/graphql/guides/introduction-to-graphql#connection
   *
   * @template T - Node type
   */
  export type Connection<T extends ObjectCurly = ObjectCurly> = {
    /**
     * A list of nodes.
     */
    nodes: T[]

    /**
     * Information to aid in pagination.
     */
    pageInfo: PageInfo
  }

  /**
   * GraphQL pagination info.
   *
   * @see https://docs.github.com/graphql/reference/objects#pageinfo
   */
  export type PageInfo = {
    /**
     * Cursor of last seen node.
     */
    endCursor: Nullable<string>

    /**
     * Boolean indicating if there are more nodes in a connection.
     */
    hasNextPage: boolean
  }

  /**
   * Execute a GraphQL request.
   *
   * The operation to perform must be specified in `options`.
   *
   * @template T - Payload data type
   *
   * @param {RequestParameters & { query: string }} options - Request options
   * @param {string} options.query - GraphQL operation
   * @return {Promise<{ payload: T }>} Payload object
   */
  export const graphql: <T>(
    options: RequestParameters & { query: string }
  ) => Promise<{ payload: T }>
}
