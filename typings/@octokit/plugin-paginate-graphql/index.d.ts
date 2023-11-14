declare module '@octokit/plugin-paginate-graphql' {
  import type { Assign, ObjectCurly } from '@flex-development/tutils'
  import type { Octokit } from '@octokit/core/dist-types'
  import type { Connection, graphql } from '@octokit/graphql'
  import type { RequestParameters } from '@octokit/types'

  /**
   * GraphQL pagination function.
   *
   * @see {@linkcode GQLPaginated}
   * @see {@linkcode RequestParameters}
   *
   * @template K - Paginated data name
   * @template T - Paginated data type
   * @template H - Payload data key
   *
   * @param {string} operation - GraphQL operation
   * @param {Assign<RequestParameters, any>?} [params] - Request parameters
   * @return {Promise<GQLPaginated<K, T, H>>} Paginated data object
   */
  type GQLPaginate = <
    K extends string,
    T extends ObjectCurly,
    H extends string = 'payload'
  >(
    operation: string,
    params?: Assign<RequestParameters, any>
  ) => Promise<GQLPaginated<K, T, H>>

  /**
   * Paginated payload object.
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
    [x in H]: { [x in K]: Connection<T> }
  }

  /**
   * GraphQL plugin with `paginate` method.
   */
  export type GraphQLPaginate = typeof graphql & {
    /**
     * GraphQL data paginator.
     *
     * @see {@linkcode GQLPaginate}
     */
    paginate: GQLPaginate
  }

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
