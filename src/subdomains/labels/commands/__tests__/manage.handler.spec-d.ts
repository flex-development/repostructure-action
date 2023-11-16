/**
 * @file Type Tests - ManageLabelsHandler
 * @module labels/commands/tests/unit-d/ManageLabelsHandler
 */

import type { Label } from '#src/labels/types'
import type { ICommandHandler } from '@nestjs/cqrs'
import type ManageLabelsCommand from '../manage.command'
import type TestSubject from '../manage.handler'

describe('unit-d:labels/commands/ManageLabelsHandler', () => {
  it('should implement ICommandHandler<ManageLabelsCommand, Label[]>', () => {
    expectTypeOf<TestSubject>()
      .toMatchTypeOf<ICommandHandler<ManageLabelsCommand, Label[]>>()
  })
})
