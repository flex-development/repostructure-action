/**
 * @file Test Setup - Environment
 * @module tests/setup/env
 */

import data from '#fixtures/api.github.com/graphql.json' assert { type: 'json' }
import INPUT_API from '#fixtures/input-api.fixture'
import INPUT_TOKEN from '#fixtures/input-token.fixture'
import { noop, type EmptyArray, type Fn } from '@flex-development/tutils'

/**
 * Stub environment variables.
 *
 * @param {Fn<EmptyArray, void>?} [fn=noop] - Environment stub callback
 * @return {void} Nothing when complete
 */
const env = (fn: Fn<EmptyArray, void> = noop): void => {
  vi.stubEnv('GITHUB_REPOSITORY', data.data.repository.nameWithOwner)

  vi.stubEnv('INPUT_API', INPUT_API)
  vi.stubEnv('INPUT_TOKEN', INPUT_TOKEN)
  vi.stubEnv('INPUT_WORKSPACE', process.cwd())

  return void fn()
}

export default env
