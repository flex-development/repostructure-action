/**
 * @file Fixtures - GRAPHQL_URL
 * @module fixtures/url-graphql
 */

import pathe from '@flex-development/pathe'
import { join } from '@flex-development/tutils'
import INPUT_API from './input-api.fixture'

/**
 * GraphQL API url.
 *
 * @const {string} GRAPHQL_URL
 */
const GRAPHQL_URL: string = join([INPUT_API, 'graphql'], pathe.sep)

export default GRAPHQL_URL
