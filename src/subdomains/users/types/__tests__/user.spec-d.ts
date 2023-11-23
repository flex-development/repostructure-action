/**
 * @file Type Tests - User
 * @module users/types/tests/unit-d/User
 */

import type { ReadonlyKeys } from '@flex-development/tutils'
import type TestSubject from '../user'

describe('unit-d:users/types/User', () => {
  it('should have all readonly keys', () => {
    expectTypeOf<keyof TestSubject>().toEqualTypeOf<ReadonlyKeys<TestSubject>>()
  })

  it('should match [id: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('id').toEqualTypeOf<string>()
  })

  it('should match [login: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('login').toEqualTypeOf<string>()
  })
})
