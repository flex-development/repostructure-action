/**
 * @file Type Tests - TeamsHandler
 * @module teams/queries/tests/unit-d/TeamsHandler
 */

import type { Team } from '#src/teams/types'
import type { IQueryHandler } from '@nestjs/cqrs'
import type TestSubject from '../teams.handler'
import type TeamsQuery from '../teams.query'

describe('unit-d:teams/queries/TeamsHandler', () => {
  it('should implement IQueryHandler<TeamsQuery, Team[]>', () => {
    expectTypeOf<TestSubject>()
      .toMatchTypeOf<IQueryHandler<TeamsQuery, Team[]>>()
  })
})
