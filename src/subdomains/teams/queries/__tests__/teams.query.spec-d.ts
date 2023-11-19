/**
 * @file Type Tests - TeamsQuery
 * @module teams/queries/tests/unit-d/TeamsQuery
 */

import type { OrganizationQuery } from '#src/queries'
import type TestSubject from '../teams.query'

describe('unit-d:teams/queries/TeamsQuery', () => {
  it('should extend OrganizationQuery', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<OrganizationQuery>()
  })

  it('should match [teams: string[]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('teams')
      .toEqualTypeOf<string[]>()
  })
})
