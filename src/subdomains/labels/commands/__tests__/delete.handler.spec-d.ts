/**
 * @file Type Tests - DeleteLabelHandler
 * @module labels/commands/tests/unit-d/DeleteLabelHandler
 */

import type { ICommandHandler } from '@nestjs/cqrs'
import type DeleteLabelCommand from '../delete.command'
import type TestSubject from '../delete.handler'

describe('unit-d:labels/commands/DeleteLabelHandler', () => {
  it('should implement ICommandHandler<DeleteLabelCommand, void>', () => {
    expectTypeOf<TestSubject>()
      .toMatchTypeOf<ICommandHandler<DeleteLabelCommand, void>>()
  })
})
