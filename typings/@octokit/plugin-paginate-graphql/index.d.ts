declare module '@octokit/plugin-paginate-graphql' {
  import type {
    Assign,
    Nullable,
    ObjectCurly,
    OmitIndexSignature
  } from '@flex-development/tutils'
  import type { Octokit } from '@octokit/core/dist-types'
  import type { graphql } from '@octokit/graphql'
  import type * as octokit from '@octokit/types'

  /**
   * Paginated GraphQL payload object.
   *
   * @template K - Paginated data name
   * @template T - Paginated data type
   * @template H - Payload data key
   */
  export type GQLPaginated<
    K extends string,
    T extends ObjectCurly,
    H extends string = 'payload'
  > = {
    /**
     * Payload data.
     */
    [x in H]: Record<K, { nodes: T[]; pageInfo: PageInfo }>
  }

  /**
   * GraphQL plugin with `paginate` method.
   */
  export type GraphQLPaginate = typeof graphql & {
    /**
     * GraphQL data paginator.
     *
     * @see {@linkcode GQLPaginated}
     * @see {@linkcode RequestParameters}
     *
     * @template K - Paginated data name
     * @template T - Paginated data type
     * @template H - Payload data key
     *
     * @param {string} operation - GraphQL operation
     * @param {RequestParameters?} [params] - Request parameters
     * @return {Promise<GQLPaginated<K, T, H>>} Paginated data object
     */
    paginate<
      K extends string,
      T extends ObjectCurly,
      H extends string = 'payload'
    >(
      operation: string,
      params?: RequestParameters
    ): Promise<GQLPaginated<K, T, H>>
  }

  /**
   * Pagination info.
   */
  export type PageInfo = {
    /**
     * Cursor of last node.
     */
    endCursor: Nullable<string>

    /**
     * Boolean indicating if there are nodes after the first page.
     */
    hasNextPage: boolean
  }

  /**
   * Request parameters.
   */
  type RequestParameters = Assign<
    OmitIndexSignature<octokit.RequestParameters>,
    ObjectCurly
  >

  /**
   * Add a `paginate` method to `octokit.graphql`.
   *
   * @see {@linkcode GraphQLPaginate}
   * @see https://github.com/octokit/plugin-paginate-graphql.js
   *
   * @param {Octokit} octokit - Octokit instance
   * @return {{ graphql: GraphQLPaginate }} GraphQL plugin with new method
   */
  export function paginateGraphql(octokit: Octokit): {
    graphql: GraphQLPaginate
  }
}
