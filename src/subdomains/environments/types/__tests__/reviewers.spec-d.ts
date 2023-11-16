/**
 * @file Type Tests - Reviewers
 * @module environments/types/tests/unit-d/Reviewers
 */

import type TestSubject from '../reviewers'

describe('unit-d:environments/types/Reviewers', () => {
  it('should match [teams: string[]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('teams')
      .toEqualTypeOf<string[]>()
  })

  it('should match [users: string[]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('users')
      .toEqualTypeOf<string[]>()
  })
})
