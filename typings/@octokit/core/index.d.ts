declare module '@octokit/core' {
  import type { Octokit as OctokitBase } from '@octokit/core/dist-types'
  import type { GraphQLPaginate } from '@octokit/plugin-paginate-graphql'

  /**
   * Octokit client.
   *
   * @see {@linkcode OctokitBase}
   *
   * @class
   * @extends {OctokitBase}
   */
  export class Octokit extends OctokitBase {
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
