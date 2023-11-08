/**
 * @file Type Tests - Label
 * @module repostructure/labels/types/tests/unit-d/Label
 */

import type { Nullable, ReadonlyKeys } from '@flex-development/tutils'
import type TestSubject from '../label'

describe('unit-d:labels/types/Label', () => {
  type RK = ReadonlyKeys<TestSubject>

  it('should match [readonly color: string]', () => {
    expectTypeOf<RK>().extract<'color'>().toBeString()
    expectTypeOf<TestSubject>().toHaveProperty('color').toEqualTypeOf<string>()
  })

  it('should match [readonly description: Nullable<string>]', () => {
    expectTypeOf<RK>().extract<'description'>().toBeString()
    expectTypeOf<TestSubject>()
      .toHaveProperty('description')
      .toEqualTypeOf<Nullable<string>>()
  })

  it('should match [readonly id: string]', () => {
    expectTypeOf<RK>().extract<'id'>().toBeString()
    expectTypeOf<TestSubject>().toHaveProperty('id').toEqualTypeOf<string>()
  })

  it('should match [readonly name: string]', () => {
    expectTypeOf<RK>().extract<'name'>().toBeString()
    expectTypeOf<TestSubject>().toHaveProperty('name').toEqualTypeOf<string>()
  })
})
