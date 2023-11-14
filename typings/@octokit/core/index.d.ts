declare module '@octokit/core' {
  import type * as core from '@octokit/core/dist-types'
  import type { GraphQLPaginate } from '@octokit/plugin-paginate-graphql'

  /**
   * Octokit client.
   *
   * @see {@linkcode core.Octokit}
   *
   * @class
   * @extends {core.Octokit}
   */
  export class Octokit extends core.Octokit {
    /**
     * GraphQL plugin.
     *
     * @see {@linkcode GraphQLPaginate}
     * @see https://github.com/octokit/graphql.js
     * @see https://github.com/octokit/plugin-paginate-graphql.js
     *
     * @public
     * @override
     * @readonly
     * @instance
     * @member {GraphQLPaginate} graphql
     */
    public override readonly graphql: GraphQLPaginate
  }
}
