/**
 * @file Type Tests - BranchProtection
 * @module branches/types/tests/unit-d/BranchProtection
 */

import type { ReadonlyKeys } from '@flex-development/tutils'
import type TestSubject from '../branch-protection'

describe('unit-d:branches/types/BranchProtection', () => {
  it('should have all readonly keys', () => {
    expectTypeOf<keyof TestSubject>().toEqualTypeOf<ReadonlyKeys<TestSubject>>()
  })

  it('should match [readonly id: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('id').toEqualTypeOf<string>()
  })

  it('should match [readonly pattern: string]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('pattern')
      .toEqualTypeOf<string>()
  })
})
