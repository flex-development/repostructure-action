/**
 * @file Type Tests - TeamsQuery
 * @module repostructure/teams/queries/tests/unit-d/TeamsQuery
 */

import type TestSubject from '../teams.query'

describe('unit-d:teams/queries/TeamsQuery', () => {
  it('should match [org: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('org').toEqualTypeOf<string>()
  })

  it('should match [teams: string[]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('teams')
      .toEqualTypeOf<string[]>()
  })
})
