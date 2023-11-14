/**
 * @file Type Tests - BranchesQuery
 * @module repostructure/branches/queries/tests/unit-d/BranchesQuery
 */

import type { RepositoryQuery } from '#src/queries'
import type TestSubject from '../branches.query'

describe('unit-d:branches/queries/BranchesQuery', () => {
  it('should extend RepositoryQuery', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<RepositoryQuery>()
  })
})
