/**
 * @file Test Utilities - gqh
 * @module tests/utils/gqh
 */

import INPUT_API from '#fixtures/input-api.fixture'
import pathe from '@flex-development/pathe'
import { join } from '@flex-development/tutils'
import * as msw from 'msw'

/**
 * Standard GraphQL handlers.
 *
 * @see https://mswjs.io/docs/api/graphql#graphqllinkurl
 *
 * @const {ReturnType<typeof msw['graphql']['link']>} gqh
 */
export default msw.graphql.link(join([INPUT_API, 'graphql'], pathe.sep))
