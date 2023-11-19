/**
 * @file Type Tests - BranchActors
 * @module branches/types/tests/unit-d/BranchActors
 */

import type { Nilable } from '@flex-development/tutils'
import type TestSubject from '../branch-actors'

describe('unit-d:branches/types/BranchActors', () => {
  it('should match [apps?: Nullable<string[]>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('apps')
      .toEqualTypeOf<Nilable<string[]>>()
  })

  it('should match [teams?: Nullable<string[]>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('teams')
      .toEqualTypeOf<Nilable<string[]>>()
  })

  it('should match [users?: Nullable<string[]>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('users')
      .toEqualTypeOf<Nilable<string[]>>()
  })
})
