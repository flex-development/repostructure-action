/**
 * @file Entry Point - Test Setup
 * @module tests/setup
 * @see https://mswjs.io/docs/api/setup-server#usage
 */

import './chai'
import './faker'
import './matchers'
import './serializers'
import './server'

import env from './env'

afterAll(() => {
  server.close()
})

afterEach(() => {
  server.resetHandlers()
})

beforeAll(() => {
  env()
  server.listen({ onUnhandledRequest: 'error' })
})

beforeEach(() => {
  env()
})
