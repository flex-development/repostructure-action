/**
 * @file Type Tests - Branch
 * @module repostructure/branches/types/tests/unit-d/Branch
 */

import type { ReadonlyKeys } from '@flex-development/tutils'
import type TestSubject from '../branch'

describe('unit-d:branches/types/Branch', () => {
  type RK = ReadonlyKeys<TestSubject>

  it('should match [readonly id: string]', () => {
    expectTypeOf<RK>().extract<'id'>().toBeString()
    expectTypeOf<TestSubject>().toHaveProperty('id').toEqualTypeOf<string>()
  })

  it('should match [readonly pattern: string]', () => {
    expectTypeOf<RK>().extract<'pattern'>().toBeString()
    expectTypeOf<TestSubject>()
      .toHaveProperty('pattern')
      .toEqualTypeOf<string>()
  })
})
