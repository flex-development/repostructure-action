/**
 * @file Entry Point - Test Setup Files
 * @module tests/setup
 */

import INPUT_API from '#fixtures/input-api.fixture'
import './chai'
import './faker'
import './matchers'
import './serializers'

beforeAll(() => {
  vi.stubEnv('GITHUB_REPOSITORY', 'flex-development/repostructure-action')
  vi.stubEnv('GITHUB_WORKSPACE', process.cwd())

  vi.stubEnv('INPUT_API', INPUT_API)
  vi.stubEnv('INPUT_TOKEN', import.meta.env.GITHUB_TOKEN)
})
