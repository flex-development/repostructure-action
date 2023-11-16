/**
 * @file Type Tests - CreateLabelHandler
 * @module labels/commands/tests/unit-d/CreateLabelHandler
 */

import type { Label } from '#src/labels/types'
import type { ICommandHandler } from '@nestjs/cqrs'
import type CreateLabelCommand from '../create.command'
import type TestSubject from '../create.handler'

describe('unit-d:labels/commands/CreateLabelHandler', () => {
  it('should implement ICommandHandler<CreateLabelCommand, Label>', () => {
    expectTypeOf<TestSubject>()
      .toMatchTypeOf<ICommandHandler<CreateLabelCommand, Label>>()
  })
})
