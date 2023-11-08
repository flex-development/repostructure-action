/**
 * @file Fixtures - API_URL
 * @module fixtures/api-url
 */

import pathe from '@flex-development/pathe'
import { join } from '@flex-development/tutils'
import INPUT_API from './input-api.fixture'

/**
 * GraphQL API url.
 *
 * @const {string} API_URL
 */
const API_URL: string = join([INPUT_API, 'graphql'], pathe.sep)

export default API_URL
