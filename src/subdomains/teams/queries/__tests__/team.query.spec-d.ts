/**
 * @file Type Tests - TeamQuery
 * @module teams/queries/tests/unit-d/TeamQuery
 */

import type TestSubject from '../team.query'

describe('unit-d:teams/queries/TeamQuery', () => {
  it('should match [org: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('org').toEqualTypeOf<string>()
  })

  it('should match [team: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('team').toEqualTypeOf<string>()
  })
})
