/**
 * @file Type Tests - Environment
 * @module environments/types/tests/unit-d/Environment
 */

import type { ReadonlyKeys } from '@flex-development/tutils'
import type TestSubject from '../environment'

describe('unit-d:environments/types/Environment', () => {
  type RK = ReadonlyKeys<TestSubject>

  it('should match [readonly id: string]', () => {
    expectTypeOf<RK>().extract<'id'>().toBeString()
    expectTypeOf<TestSubject>().toHaveProperty('id').toEqualTypeOf<string>()
  })

  it('should match [readonly name: string]', () => {
    expectTypeOf<RK>().extract<'name'>().toBeString()
    expectTypeOf<TestSubject>().toHaveProperty('name').toEqualTypeOf<string>()
  })
})
