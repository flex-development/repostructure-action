/**
 * @file Type Tests - Environment
 * @module environments/types/tests/unit-d/Environment
 */

import type { ReadonlyKeys } from '@flex-development/tutils'
import type TestSubject from '../environment'

describe('unit-d:environments/types/Environment', () => {
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
