/**
 * @file Type Tests - TeamHandler
 * @module teams/queries/tests/unit-d/TeamHandler
 */

import type { Team } from '#src/teams/types'
import type { IQueryHandler } from '@nestjs/cqrs'
import type TestSubject from '../team.handler'
import type TeamQuery from '../team.query'

describe('unit-d:teams/queries/TeamHandler', () => {
  it('should implement IQueryHandler<TeamQuery, Team>', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<IQueryHandler<TeamQuery, Team>>()
  })
})
