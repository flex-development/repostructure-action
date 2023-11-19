/**
 * @file Type Tests - ManageBranchProtectionsHandler
 * @module branches/commands/tests/unit-d/ManageBranchProtectionsHandler
 */

import type { BranchProtection } from '#src/branches/types'
import type { ManageListHandler } from '#src/commands'
import type ManageBranchProtectionsCommand from '../manage.command'
import type TestSubject from '../manage.handler'

describe('unit-d:branches/commands/ManageBranchProtectionsHandler', () => {
  it('should extend ManageListHandler<ManageBranchProtectionsCommand, BranchProtection>', () => {
    expectTypeOf<TestSubject>()
      .toMatchTypeOf<
        ManageListHandler<ManageBranchProtectionsCommand, BranchProtection>
      >()
  })
})
