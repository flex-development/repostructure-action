/**
 * @file Type Tests - DeleteEnvironmentHandler
 * @module environments/commands/tests/unit-d/DeleteEnvironmentHandler
 */

import type { ICommandHandler } from '@nestjs/cqrs'
import type DeleteEnvironmentCommand from '../delete.command'
import type TestSubject from '../delete.handler'

describe('unit-d:environments/commands/DeleteEnvironmentHandler', () => {
  it('should implement ICommandHandler<DeleteEnvironmentCommand, void>', () => {
    expectTypeOf<TestSubject>()
      .toMatchTypeOf<ICommandHandler<DeleteEnvironmentCommand, void>>()
  })
})
