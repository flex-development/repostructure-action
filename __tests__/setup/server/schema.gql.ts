/**
 * @file Test Server - schema
 * @module tests/setup/server/schema
 * @see https://mswjs.io/docs/recipes/mock-graphql-schema
 */

import * as mlly from '@flex-development/mlly'
import pathe from '@flex-development/pathe'
import { buildSchema, type GraphQLSchema } from 'graphql'

/**
 * Absolute path to GraphQL schema file.
 *
 * @const {string} source
 */
const source: string = pathe.resolve('github.schema.gql')

/**
 * GraphQL schema object.
 *
 * @see {@linkcode GraphQLSchema}
 *
 * @const {GraphQLSchema} schema
 */
const schema: GraphQLSchema = buildSchema(<string>await mlly.getSource(source))

export default schema
