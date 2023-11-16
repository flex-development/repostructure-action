/**
 * @file Type Tests - UserHandler
 * @module users/queries/tests/unit-d/UserHandler
 */

import type { User } from '#src/users/types'
import type { IQueryHandler } from '@nestjs/cqrs'
import type TestSubject from '../user.handler'
import type UserQuery from '../user.query'

describe('unit-d:users/queries/UserHandler', () => {
  it('should implement IQueryHandler<UserQuery, User>', () => {
    expectTypeOf<TestSubject>()
      .toMatchTypeOf<IQueryHandler<UserQuery, User>>()
  })
})
