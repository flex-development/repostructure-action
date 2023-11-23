/**
 * @file Type Tests - UsersQuery
 * @module users/queries/tests/unit-d/UsersQuery
 */

import type { User } from '#src/users/types'
import type TestSubject from '../users.query'

describe('unit-d:users/queries/UsersQuery', () => {
  it('should match [users: User["login"][]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('users')
      .toEqualTypeOf<User['login'][]>()
  })
})
