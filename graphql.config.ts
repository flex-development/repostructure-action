/**
 * @file Configuration - GraphQL
 * @module config/graphql
 * @see https://the-guild.dev/graphql/config/docs
 * @see https://the-guild.dev/graphql/tools/docs/graphql-tag-pluck
 */

import type { IGraphQLProject } from 'graphql-config'

/**
 * GraphQL project configuration.
 *
 * @see {@linkcode IGraphQLProject}
 *
 * @const {IGraphQLProject} config
 */
const config: IGraphQLProject = {
  documents: 'src/subdomains/**/**/*.ts',
  extensions: {
    pluckConfig: { modules: [{ identifier: 'gql', name: 'graphql-tag' }] }
  },
  schema: 'github.schema.gql'
}

export default config
