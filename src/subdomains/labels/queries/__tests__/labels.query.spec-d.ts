/**
 * @file Type Tests - LabelsQuery
 * @module repostructure/labels/queries/tests/unit-d/LabelsQuery
 */

import type TestSubject from '../labels.query'

describe('unit-d:labels/queries/LabelsQuery', () => {
  it('should match [owner: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('owner').toEqualTypeOf<string>()
  })

  it('should match [repo: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('repo').toEqualTypeOf<string>()
  })
})
