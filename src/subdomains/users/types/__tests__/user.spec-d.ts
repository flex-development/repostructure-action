/**
 * @file Type Tests - User
 * @module users/types/tests/unit-d/User
 */

import type { ReadonlyKeys } from '@flex-development/tutils'
import type TestSubject from '../user'

describe('unit-d:users/types/User', () => {
  type RK = ReadonlyKeys<TestSubject>

  it('should match [readonly id: string]', () => {
    expectTypeOf<RK>().extract<'id'>().toBeString()
    expectTypeOf<TestSubject>().toHaveProperty('id').toEqualTypeOf<string>()
  })

  it('should match [readonly login: string]', () => {
    expectTypeOf<RK>().extract<'login'>().toBeString()
    expectTypeOf<TestSubject>().toHaveProperty('login').toEqualTypeOf<string>()
  })
})
