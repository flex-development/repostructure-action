/**
 * @file Type Tests - CreateEnvironmentCommand
 * @module environments/commands/tests/unit-d/CreateEnvironmentCommand
 */

import type { Reviewers } from '#src/environments/types'
import type { Nilable, ReadonlyKeys } from '@flex-development/tutils'
import type TestSubject from '../create.command'

describe('unit-d:environments/commands/CreateEnvironmentCommand', () => {
  type RK = ReadonlyKeys<TestSubject>

  it('should match [readonly name: string]', () => {
    expectTypeOf<RK>().extract<'name'>().toBeString()
    expectTypeOf<TestSubject>().toHaveProperty('name').toEqualTypeOf<string>()
  })

  it('should match [readonly prevent_self_review?: Nullable<boolean>]', () => {
    expectTypeOf<RK>().extract<'prevent_self_review'>().toBeString()
    expectTypeOf<TestSubject>()
      .toHaveProperty('prevent_self_review')
      .toEqualTypeOf<Nilable<boolean>>()
  })

  it('should match [readonly reviewers?: Nullable<Partial<Reviewers>>]', () => {
    expectTypeOf<RK>().extract<'reviewers'>().toBeString()
    expectTypeOf<TestSubject>()
      .toHaveProperty('reviewers')
      .toEqualTypeOf<Nilable<Partial<Reviewers>>>()
  })

  it('should match [readonly wait_timer?: Nullable<number>]', () => {
    expectTypeOf<RK>().extract<'wait_timer'>().toBeString()
    expectTypeOf<TestSubject>()
      .toHaveProperty('wait_timer')
      .toEqualTypeOf<Nilable<number>>()
  })
})
