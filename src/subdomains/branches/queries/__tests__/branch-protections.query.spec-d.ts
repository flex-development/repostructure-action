/**
 * @file Type Tests - BranchProtectionsQuery
 * @module branches/queries/tests/unit-d/BranchProtectionsQuery
 */

import type { RepositoryQuery } from '#src/queries'
import type TestSubject from '../branch-protections.query'

describe('unit-d:branches/queries/BranchProtectionsQuery', () => {
  it('should extend RepositoryQuery', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<RepositoryQuery>()
  })
})
