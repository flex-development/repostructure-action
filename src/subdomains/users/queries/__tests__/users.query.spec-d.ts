/**
 * @file Type Tests - UsersQuery
 * @module users/queries/tests/unit-d/UsersQuery
 */

import type TestSubject from '../users.query'

describe('unit-d:users/queries/UsersQuery', () => {
  it('should match [logins: string[]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('logins')
      .toEqualTypeOf<string[]>()
  })
})
