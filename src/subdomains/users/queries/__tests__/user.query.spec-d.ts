/**
 * @file Type Tests - UserQuery
 * @module users/queries/tests/unit-d/UserQuery
 */

import type { User } from '#src/users/types'
import type TestSubject from '../user.query'

describe('unit-d:users/queries/UserQuery', () => {
  it('should match [login: User["login"]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('login')
      .toEqualTypeOf<User['login']>()
  })
})
