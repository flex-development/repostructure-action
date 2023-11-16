/**
 * @file Type Tests - UpdateEnvironmentHandler
 * @module environments/commands/tests/unit-d/UpdateEnvironmentHandler
 */

import type { Environment } from '#src/environments/types'
import type { ICommandHandler } from '@nestjs/cqrs'
import type UpdateEnvironmentCommand from '../update.command'
import type TestSubject from '../update.handler'

describe('unit-d:environments/commands/UpdateEnvironmentHandler', () => {
  it('should implement ICommandHandler<UpdateEnvironmentCommand, Environment>', () => {
    expectTypeOf<TestSubject>()
      .toMatchTypeOf<ICommandHandler<UpdateEnvironmentCommand, Environment>>()
  })
})
