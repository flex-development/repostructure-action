declare module '@octokit/graphql' {
  import type { Nullable, ObjectCurly } from '@flex-development/tutils'
  import type { EndpointInterface, RequestParameters } from '@octokit/types'

  /**
   * Octokit GraphQL API.
   */
  interface Api {
    /**
     * Execute a GraphQL request.
     *
     * The operation to perform must be specified in `options`.
     *
     * @see {@linkcode RequestParameters}
     *
     * @template T - Payload data type
     *
     * @param {RequestParameters & { query: string }} options - Request options
     * @param {string} options.query - GraphQL operation
     * @return {Promise<{ payload: T }>} Payload object
     */
    <T>(options: RequestParameters & { query: string }): Promise<{ payload: T }>

    /**
     * Get a new `graphql` api with `defaults` applied.
     *
     * @see {@linkcode RequestParameters}
     *
     * @param {RequestParameters} defaults - Default request options
     * @return {graphql} graphql api
     */
    defaults(defaults: RequestParameters): graphql

    /**
     * Octokit endpoint API.
     *
     * @see https://github.com/octokit/endpoint.js
     */
    endpoint: EndpointInterface
  }

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
   * Octokit GraphQL API client.
   *
   * @const {OctokitGraphqlApi} graphql
   */
  const graphql: Api

  export { GraphqlResponseError } from '@octokit/graphql/dist-types/error'
  export type {
    GraphQlEndpointOptions,
    GraphQlQueryResponse
  } from '@octokit/graphql/dist-types/types'
  export { graphql }
}
