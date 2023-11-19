/**
 * @file Type Tests - UpdateBranchProtectionHandler
 * @module branches/commands/tests/unit-d/UpdateBranchProtectionHandler
 */

import type { BranchProtection } from '#src/branches/types'
import type { ICommandHandler } from '@nestjs/cqrs'
import type UpdateBranchProtectionCommand from '../update.command'
import type TestSubject from '../update.handler'

describe('unit-d:branches/commands/UpdateBranchProtectionHandler', () => {
  it('should implement ICommandHandler<UpdateBranchProtectionCommand, BranchProtection>', () => {
    expectTypeOf<TestSubject>()
      .toMatchTypeOf<ICommandHandler<
        UpdateBranchProtectionCommand,
        BranchProtection
      >>()
  })
})
