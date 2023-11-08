/**
 * @file Fixtures - CLIENT_MUTATION_ID
 * @module fixtures/CLIENT_MUTATION_ID
 */

import pkg from '#pkg' assert { type: 'json' }
import pathe from '@flex-development/pathe'
import { join } from '@flex-development/tutils'

/**
 * GraphQL mutation id.
 *
 * @const {string} CLIENT_MUTATION_ID
 */
const CLIENT_MUTATION_ID: string = join([pkg.name, pkg.version], pathe.sep)

export default CLIENT_MUTATION_ID
