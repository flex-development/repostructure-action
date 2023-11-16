/**
 * @file Type Tests - BranchesHandler
 * @module branches/queries/tests/unit-d/BranchesHandler
 */

import type { Branch } from '#src/branches/types'
import type { IQueryHandler } from '@nestjs/cqrs'
import type TestSubject from '../branches.handler'
import type BranchesQuery from '../branches.query'

describe('unit-d:branches/queries/BranchesHandler', () => {
  it('should implement IQueryHandler<BranchesQuery, Branch[]>', () => {
    expectTypeOf<TestSubject>()
      .toMatchTypeOf<IQueryHandler<BranchesQuery, Branch[]>>()
  })
})
