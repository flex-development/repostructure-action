/**
 * @file Type Tests - UsersHandler
 * @module users/queries/tests/unit-d/UsersHandler
 */

import type { User } from '#src/users/types'
import type { IQueryHandler } from '@nestjs/cqrs'
import type TestSubject from '../users.handler'
import type UsersQuery from '../users.query'

describe('unit-d:users/queries/UsersHandler', () => {
  it('should implement IQueryHandler<UsersQuery, User[]>', () => {
    expectTypeOf<TestSubject>()
      .toMatchTypeOf<IQueryHandler<UsersQuery, User[]>>()
  })
})
