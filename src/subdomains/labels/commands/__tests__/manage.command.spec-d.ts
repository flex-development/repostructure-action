/**
 * @file Type Tests - ManageLabelsCommand
 * @module labels/commands/tests/unit-d/ManageLabelsCommand
 */

import type { ReadonlyKeys } from '@flex-development/tutils'
import type CreateLabelCommand from '../create.command'
import type TestSubject from '../manage.command'

describe('unit-d:labels/commands/ManageLabelsCommand', () => {
  it('should match [readonly labels: CreateLabelCommand[]]', () => {
    expectTypeOf<ReadonlyKeys<TestSubject>>().extract<'labels'>().toBeString()
    expectTypeOf<TestSubject>()
      .toHaveProperty('labels')
      .toEqualTypeOf<CreateLabelCommand[]>()
  })
})
