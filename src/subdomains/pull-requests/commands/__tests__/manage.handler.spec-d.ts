/**
 * @file Type Tests - ManagePullRequestsHandler
 * @module pull-requests/commands/tests/unit-d/ManagePullRequestsHandler
 */

import type { ICommandHandler } from '@nestjs/cqrs'
import type ManagePullRequestsCommand from '../manage.command'
import type TestSubject from '../manage.handler'

describe('unit-d:pull-requests/commands/ManagePullRequestsHandler', () => {
  it('should implement ICommandHandler<ManagePullRequestsCommand, void>', () => {
    expectTypeOf<TestSubject>()
      .toMatchTypeOf<ICommandHandler<ManagePullRequestsCommand, void>>()
  })
})
