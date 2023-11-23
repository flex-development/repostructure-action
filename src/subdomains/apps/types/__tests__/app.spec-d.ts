/**
 * @file Type Tests - App
 * @module apps/types/tests/unit-d/App
 */

import type { ReadonlyKeys } from '@flex-development/tutils'
import type TestSubject from '../app'

describe('unit-d:apps/types/App', () => {
  it('should have all readonly keys', () => {
    expectTypeOf<keyof TestSubject>().toEqualTypeOf<ReadonlyKeys<TestSubject>>()
  })

  it('should match [id: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('id').toEqualTypeOf<string>()
  })

  it('should match [slug: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('slug').toEqualTypeOf<string>()
  })
})
