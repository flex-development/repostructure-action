/**
 * @file Fixtures - ApiUrl
 * @module fixtures/ApiUrl
 */

import pathe from '@flex-development/pathe'
import { define, entries, join } from '@flex-development/tutils'
import INPUT_API from './input-api.fixture'
import OWNER from './owner.fixture'
import REPO from './repo.fixture'

/**
 * GitHub API urls.
 *
 * @enum {Lowercase<string>}
 */
const ApiUrl = {
  BASE: INPUT_API,
  GRAPHQL: 'graphql',
  REPO: join(['repos', OWNER, REPO], pathe.sep)
}

// add base api url to endpoints
for (const [name, endpoint] of entries(ApiUrl)) {
  if (endpoint !== INPUT_API) {
    define(ApiUrl, name, { value: join([INPUT_API, endpoint], pathe.sep) })
  }
}

export default Object.freeze(ApiUrl)
