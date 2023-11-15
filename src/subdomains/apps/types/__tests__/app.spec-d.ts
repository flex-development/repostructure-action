/**
 * @file Type Tests - App
 * @module repostructure/apps/types/tests/unit-d/App
 */

import type { ReadonlyKeys } from '@flex-development/tutils'
import type TestSubject from '../app'

describe('unit-d:apps/types/App', () => {
  type RK = ReadonlyKeys<TestSubject>

  it('should match [readonly id: string]', () => {
    expectTypeOf<RK>().extract<'id'>().toBeString()
    expectTypeOf<TestSubject>().toHaveProperty('id').toEqualTypeOf<string>()
  })

  it('should match [readonly slug: string]', () => {
    expectTypeOf<RK>().extract<'slug'>().toBeString()
    expectTypeOf<TestSubject>().toHaveProperty('slug').toEqualTypeOf<string>()
  })
})
