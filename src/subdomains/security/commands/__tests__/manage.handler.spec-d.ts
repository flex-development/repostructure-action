/**
 * @file Type Tests - ManageSecurityHandler
 * @module security/commands/tests/unit-d/ManageSecurityHandler
 */

import type { ICommandHandler } from '@nestjs/cqrs'
import type ManageSecurityCommand from '../manage.command'
import type TestSubject from '../manage.handler'

describe('unit-d:security/commands/ManageSecurityHandler', () => {
  it('should implement ICommandHandler<ManageSecurityCommand, void>', () => {
    expectTypeOf<TestSubject>()
      .toMatchTypeOf<ICommandHandler<ManageSecurityCommand, void>>()
  })
})
