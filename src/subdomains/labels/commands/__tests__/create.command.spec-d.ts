/**
 * @file Type Tests - CreateLabelCommand
 * @module labels/commands/tests/unit-d/CreateLabelCommand
 */

import type { Nilable, ReadonlyKeys } from '@flex-development/tutils'
import type TestSubject from '../create.command'

describe('unit-d:labels/commands/CreateLabelCommand', () => {
  type RK = ReadonlyKeys<TestSubject>

  it('should match [readonly color: string]', () => {
    expectTypeOf<RK>().extract<'color'>().toBeString()
    expectTypeOf<TestSubject>().toHaveProperty('color').toEqualTypeOf<string>()
  })

  it('should match [readonly description?: Nullable<string>]', () => {
    expectTypeOf<RK>().extract<'description'>().toBeString()
    expectTypeOf<TestSubject>()
      .toHaveProperty('description')
      .toEqualTypeOf<Nilable<string>>()
  })

  it('should match [readonly name: string]', () => {
    expectTypeOf<RK>().extract<'name'>().toBeString()
    expectTypeOf<TestSubject>().toHaveProperty('name').toEqualTypeOf<string>()
  })
})
