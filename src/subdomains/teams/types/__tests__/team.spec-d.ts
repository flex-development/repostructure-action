/**
 * @file Type Tests - Team
 * @module repostructure/teams/types/tests/unit-d/Team
 */

import type { ReadonlyKeys } from '@flex-development/tutils'
import type TestSubject from '../team'

describe('unit-d:teams/teams/Team', () => {
  type RK = ReadonlyKeys<TestSubject>

  it('should match [readonly id: string]', () => {
    expectTypeOf<RK>().extract<'id'>().toBeString()
    expectTypeOf<TestSubject>().toHaveProperty('id').toEqualTypeOf<string>()
  })

  it('should match [readonly slug: string]', () => {
    expectTypeOf<RK>().extract<'slug'>().toBeString()
    expectTypeOf<TestSubject>().toHaveProperty('slug').toEqualTypeOf<string>()
  })
})
