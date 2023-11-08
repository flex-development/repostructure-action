/**
 * @file Type Tests - UpdateLabelHandler
 * @module repostructure/labels/commands/tests/unit-d/UpdateLabelHandler
 */

import type { Label } from '#src/labels/types'
import type { ICommandHandler } from '@nestjs/cqrs'
import type UpdateLabelCommand from '../update.command'
import type TestSubject from '../update.handler'

describe('unit-d:labels/commands/UpdateLabelHandler', () => {
  it('should implement ICommandHandler<UpdateLabelCommand, Label>', () => {
    expectTypeOf<TestSubject>()
      .toMatchTypeOf<ICommandHandler<UpdateLabelCommand, Label>>()
  })
})
