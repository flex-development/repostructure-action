/**
 * @file Entry Point - Test Setup Files
 * @module tests/setup
 */

import './chai'
import './faker'
import './matchers'
import './serializers'

import env from './env'

beforeAll(() => {
  env()
})

beforeEach(() => {
  env()
})
