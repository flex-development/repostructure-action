/**
 * @file Entry Point - Test Setup Files
 * @module tests/setup
 */

import INPUT_API from '#fixtures/input-api.fixture'
import INPUT_TOKEN from '#fixtures/input-token.fixture'
import pkg from '#pkg' assert { type: 'json' }
import './chai'
import './faker'
import './matchers'
import './serializers'

beforeAll(() => {
  vi.stubEnv('GITHUB_REPOSITORY', pkg.name.slice(1))

  vi.stubEnv('INPUT_API', INPUT_API)
  vi.stubEnv('INPUT_TOKEN', INPUT_TOKEN)
})
