/**
 * @file Type Tests - BranchProtectionsHandler
 * @module branches/queries/tests/unit-d/BranchProtectionsHandler
 */

import type { BranchProtection } from '#src/branches/types'
import type { IQueryHandler } from '@nestjs/cqrs'
import type TestSubject from '../branch-protections.handler'
import type BranchProtectionsQuery from '../branch-protections.query'

describe('unit-d:branches/queries/BranchProtectionsHandler', () => {
  it('should implement IQueryHandler<BranchProtectionsQuery, Branch[]>', () => {
    expectTypeOf<TestSubject>()
      .toMatchTypeOf<
        IQueryHandler<BranchProtectionsQuery, BranchProtection[]>
      >()
  })
})
