/**
 * @file Type Tests - UserQuery
 * @module users/queries/tests/unit-d/UserQuery
 */

import type TestSubject from '../user.query'

describe('unit-d:users/queries/UserQuery', () => {
  it('should match [login: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('login').toEqualTypeOf<string>()
  })
})
