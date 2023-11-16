/**
 * @file Type Tests - CreateEnvironmentHandler
 * @module environments/commands/tests/unit-d/CreateEnvironmentHandler
 */

import type { Environment } from '#src/environments/types'
import type { ICommandHandler } from '@nestjs/cqrs'
import type CreateEnvironmentCommand from '../create.command'
import type TestSubject from '../create.handler'

describe('unit-d:environments/commands/CreateEnvironmentHandler', () => {
  it('should implement ICommandHandler<CreateEnvironmentCommand, Environment>', () => {
    expectTypeOf<TestSubject>()
      .toMatchTypeOf<ICommandHandler<CreateEnvironmentCommand, Environment>>()
  })
})
