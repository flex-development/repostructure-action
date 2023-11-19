/**
 * @file Type Tests - CreateBranchProtectionHandler
 * @module branches/commands/tests/unit-d/CreateBranchProtectionHandler
 */

import type { BranchProtection } from '#src/branches/types'
import type { ICommandHandler } from '@nestjs/cqrs'
import type CreateBranchProtectionCommand from '../create.command'
import type TestSubject from '../create.handler'

describe('unit-d:branches/commands/CreateBranchProtectionHandler', () => {
  it('should implement ICommandHandler<CreateBranchProtectionCommand, BranchProtection>', () => {
    expectTypeOf<TestSubject>()
      .toMatchTypeOf<ICommandHandler<
        CreateBranchProtectionCommand,
        BranchProtection
      >>()
  })
})
