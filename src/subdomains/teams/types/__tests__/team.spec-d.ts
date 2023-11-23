/**
 * @file Type Tests - Team
 * @module teams/types/tests/unit-d/Team
 */

import type { ReadonlyKeys } from '@flex-development/tutils'
import type TestSubject from '../team'

describe('unit-d:teams/teams/Team', () => {
  it('should have all readonly keys', () => {
    expectTypeOf<keyof TestSubject>().toEqualTypeOf<ReadonlyKeys<TestSubject>>()
  })

  it('should match [id: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('id').toEqualTypeOf<string>()
  })

  it('should match [slug: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('slug').toEqualTypeOf<string>()
  })
})
