/**
 * @file Type Tests - Inputs
 * @module repostructure/config/interfaces/tests/unit-d/Inputs
 */

import type TestSubject from '../inputs.interface'

describe('unit-d:config/interfaces/Inputs', () => {
  it('should match [api: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('api').toEqualTypeOf<string>()
  })

  it('should match [config: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('config').toEqualTypeOf<string>()
  })

  it('should match [token: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('token').toEqualTypeOf<string>()
  })
})
