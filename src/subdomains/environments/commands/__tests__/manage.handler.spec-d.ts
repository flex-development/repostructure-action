/**
 * @file Type Tests - ManageEnvironmentsHandler
 * @module environments/commands/tests/unit-d/ManageEnvironmentsHandler
 */

import type { ManageListHandler } from '#src/commands'
import type { Environment } from '#src/environments/types'
import type ManageEnvironmentsCommand from '../manage.command'
import type TestSubject from '../manage.handler'

describe('unit-d:environments/commands/ManageEnvironmentsHandler', () => {
  it('should extend ManageListHandler<ManageEnvironmentsCommand, Environment>', () => {
    expectTypeOf<TestSubject>()
      .toMatchTypeOf<
        ManageListHandler<ManageEnvironmentsCommand, Environment>
      >()
  })
})
