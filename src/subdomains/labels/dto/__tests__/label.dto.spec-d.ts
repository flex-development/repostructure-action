/**
 * @file Type Tests - LabelDTO
 * @module labels/dto/tests/unit-d/LabelDTO
 */

import type { Nilable, ReadonlyKeys } from '@flex-development/tutils'
import type TestSubject from '../label.dto'

describe('unit-d:labels/dto/LabelDTO', () => {
  it('should have all readonly keys', () => {
    expectTypeOf<keyof TestSubject>().toEqualTypeOf<ReadonlyKeys<TestSubject>>()
  })

  it('should match [description?: Nullable<string>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('description')
      .toEqualTypeOf<Nilable<string>>()
  })
})
