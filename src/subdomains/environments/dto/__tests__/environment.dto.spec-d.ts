/**
 * @file Type Tests - EnvironmentDTO
 * @module environments/dto/tests/unit-d/EnvironmentDTO
 */

import type { Reviewers } from '#src/environments/types'
import type { Nilable, ReadonlyKeys } from '@flex-development/tutils'
import type TestSubject from '../environment.dto'

describe('unit-d:environments/dto/EnvironmentDTO', () => {
  it('should have all readonly keys', () => {
    expectTypeOf<keyof TestSubject>().toEqualTypeOf<ReadonlyKeys<TestSubject>>()
  })

  it('should match [prevent_self_review?: Nullable<boolean>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('prevent_self_review')
      .toEqualTypeOf<Nilable<boolean>>()
  })

  it('should match [reviewers?: Nullable<Partial<Reviewers>>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('reviewers')
      .toEqualTypeOf<Nilable<Partial<Reviewers>>>()
  })

  it('should match [wait_timer?: Nullable<number>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('wait_timer')
      .toEqualTypeOf<Nilable<number>>()
  })
})
