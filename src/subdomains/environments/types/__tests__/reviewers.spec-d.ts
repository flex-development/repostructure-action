/**
 * @file Type Tests - Reviewers
 * @module environments/types/tests/unit-d/Reviewers
 */

import type { Team } from '#src/teams/types'
import type { User } from '#src/users/types'
import type TestSubject from '../reviewers'

describe('unit-d:environments/types/Reviewers', () => {
  it('should match [teams: Team["slug"][]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('teams')
      .toEqualTypeOf<Team['slug'][]>()
  })

  it('should match [users: User["login"][]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('users')
      .toEqualTypeOf<User['login'][]>()
  })
})
