/**
 * @file Test Setup - Environment
 * @module tests/setup/env
 */

import INPUT_API from '#fixtures/input-api.fixture'
import INPUT_TOKEN from '#fixtures/input-token.fixture'
import OWNER from '#fixtures/owner.fixture'
import REPO from '#fixtures/repo.fixture'
import pathe from '@flex-development/pathe'
import { join, noop, type EmptyArray, type Fn } from '@flex-development/tutils'

/**
 * Stub environment variables.
 *
 * @param {Fn<EmptyArray, void>?} [fn=noop] - Stub callback to execute
 * @return {void} Nothing when complete
 */
const env = (fn: Fn<EmptyArray, void> = noop): void => {
  vi.stubEnv('GITHUB_REPOSITORY', join([OWNER, REPO], pathe.sep))

  vi.stubEnv('INPUT_API', INPUT_API)
  vi.stubEnv('INPUT_TOKEN', INPUT_TOKEN)
  vi.stubEnv('INPUT_WORKSPACE', process.cwd())

  return void fn()
}

export default env
