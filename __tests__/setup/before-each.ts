/**
 * @file Test Setup - beforeEach
 * @module tests/setup/beforeEach
 * @see https://vitest.dev/api/#beforeeach
 */

beforeEach(() => {
  // set GITHUB_REPOSITORY environment variable
  vi.stubEnv('GITHUB_REPOSITORY', 'flex-development/rice-action')
})
