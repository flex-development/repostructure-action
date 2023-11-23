/**
 * @file Type Tests - TeamQuery
 * @module teams/queries/tests/unit-d/TeamQuery
 */

import type { OrganizationQuery } from '#src/queries'
import type { Team } from '#src/teams/types'
import TestSubject from '../team.query'

describe('unit-d:teams/queries/TeamQuery', () => {
  it('should extend OrganizationQuery', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<OrganizationQuery>()
  })

  it('should match [team: Team["slug"]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('team')
      .toEqualTypeOf<Team['slug']>()
  })
})
