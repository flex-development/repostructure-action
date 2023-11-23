/**
 * @file Type Tests - Label
 * @module labels/types/tests/unit-d/Label
 */

import type { ReadonlyKeys } from '@flex-development/tutils'
import type TestSubject from '../label'

describe('unit-d:labels/types/Label', () => {
  it('should have all readonly keys', () => {
    expectTypeOf<keyof TestSubject>().toEqualTypeOf<ReadonlyKeys<TestSubject>>()
  })

  it('should match [id: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('id').toEqualTypeOf<string>()
  })

  it('should match [name: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('name').toEqualTypeOf<string>()
  })
})
