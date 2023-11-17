/**
 * @file Type Tests - AppsQuery
 * @module apps/queries/tests/unit-d/AppsQuery
 */

import type TestSubject from '../apps.query'

describe('unit-d:apps/queries/AppsQuery', () => {
  it('should match [apps: string[]]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('apps').toEqualTypeOf<string[]>()
  })
})
