/**
 * @file Type Tests - UpdateLabelCommand
 * @module repostructure/labels/commands/tests/unit-d/UpdateLabelCommand
 */

import type { Nilable, ReadonlyKeys } from '@flex-development/tutils'
import type TestSubject from '../update.command'

describe('unit-d:labels/commands/UpdateLabelCommand', () => {
  type RK = ReadonlyKeys<TestSubject>

  it('should match [readonly color?: Nilable<string>]', () => {
    expectTypeOf<RK>().extract<'color'>().toBeString()
    expectTypeOf<TestSubject>()
      .toHaveProperty('color')
      .toEqualTypeOf<Nilable<string>>()
  })

  it('should match [readonly description?: Nilable<string>]', () => {
    expectTypeOf<RK>().extract<'description'>().toBeString()
    expectTypeOf<TestSubject>()
      .toHaveProperty('description')
      .toEqualTypeOf<Nilable<string>>()
  })

  it('should match [readonly id: string]', () => {
    expectTypeOf<RK>().extract<'id'>().toBeString()
    expectTypeOf<TestSubject>().toHaveProperty('id').toEqualTypeOf<string>()
  })

  it('should match [readonly name?: Nilable<string>]', () => {
    expectTypeOf<RK>().extract<'name'>().toBeString()
    expectTypeOf<TestSubject>()
      .toHaveProperty('name')
      .toEqualTypeOf<Nilable<string>>()
  })
})
