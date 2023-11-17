/**
 * @file Type Tests - DeleteBranchProtectionHandler
 * @module branches/commands/tests/unit-d/DeleteBranchProtectionHandler
 */

import type { ICommandHandler } from '@nestjs/cqrs'
import type DeleteBranchProtectionCommand from '../delete.command'
import type TestSubject from '../delete.handler'

describe('unit-d:branches/commands/DeleteBranchProtectionHandler', () => {
  it('should implement ICommandHandler<DeleteBranchProtectionCommand, void>', () => {
    expectTypeOf<TestSubject>()
      .toMatchTypeOf<ICommandHandler<DeleteBranchProtectionCommand, void>>()
  })
})
