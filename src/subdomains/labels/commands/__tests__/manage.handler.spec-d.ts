/**
 * @file Type Tests - ManageLabelsHandler
 * @module labels/commands/tests/unit-d/ManageLabelsHandler
 */

import type { ManageListHandler } from '#src/commands'
import type { Label } from '#src/labels/types'
import type ManageLabelsCommand from '../manage.command'
import type TestSubject from '../manage.handler'

describe('unit-d:labels/commands/ManageLabelsHandler', () => {
  it('should extend ManageListHandler<ManageLabelsCommand, Label>', () => {
    expectTypeOf<TestSubject>()
      .toMatchTypeOf<ManageListHandler<ManageLabelsCommand, Label>>()
  })
})
