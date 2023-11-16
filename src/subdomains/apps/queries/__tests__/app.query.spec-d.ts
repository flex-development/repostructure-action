/**
 * @file Type Tests - AppQuery
 * @module apps/queries/tests/unit-d/AppQuery
 */

import type TestSubject from '../app.query'

describe('unit-d:apps/queries/AppQuery', () => {
  it('should match [app: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('app').toEqualTypeOf<string>()
  })
})
