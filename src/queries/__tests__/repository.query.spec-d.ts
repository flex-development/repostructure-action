/**
 * @file Type Tests - RepositoryQuery
 * @module repostructure/queries/tests/unit-d/RepositoryQuery
 */

import type TestSubject from '../repository.query'

describe('unit-d:queries/RepositoryQuery', () => {
  it('should match [owner: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('owner').toEqualTypeOf<string>()
  })

  it('should match [repo: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('repo').toEqualTypeOf<string>()
  })
})
