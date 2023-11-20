/**
 * @file Type Tests - PullRequestProtection
 * @module branches/types/tests/unit-d/PullRequestProtection
 */

import type { NaturalRange, Nilable } from '@flex-development/tutils'
import type BranchActors from '../branch-actors'
import type TestSubject from '../pr-protection'

describe('unit-d:branches/types/PullRequestProtection', () => {
  it('should match [approving_review_count?: Nullable<NaturalRange<7>>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('approving_review_count')
      .toEqualTypeOf<Nilable<NaturalRange<7>>>()
  })

  it('should match [bypass_restrictions?: Nullable<BranchActors>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('bypass_restrictions')
      .toEqualTypeOf<Nilable<BranchActors>>()
  })

  it('should match [code_owner_reviews?: Nullable<boolean>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('code_owner_reviews')
      .toEqualTypeOf<Nilable<boolean>>()
  })

  it('should match [dismiss_stale_reviews?: Nullable<boolean>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('dismiss_stale_reviews')
      .toEqualTypeOf<Nilable<boolean>>()
  })

  it('should match [dismissal_restrictions?: Nullable<BranchActors>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('dismissal_restrictions')
      .toEqualTypeOf<Nilable<BranchActors>>()
  })

  it('should match [last_push_approval?: Nullable<boolean>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('last_push_approval')
      .toEqualTypeOf<Nilable<boolean>>()
  })
})
