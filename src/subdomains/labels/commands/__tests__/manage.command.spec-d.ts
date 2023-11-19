/**
 * @file Type Tests - ManageLabelsCommand
 * @module labels/commands/tests/unit-d/ManageLabelsCommand
 */

import type { ReadonlyKeys } from '@flex-development/tutils'
import type CreateLabelCommand from '../create.command'
import type TestSubject from '../manage.command'

describe('unit-d:labels/commands/ManageLabelsCommand', () => {
  it('should have all readonly keys', () => {
    expectTypeOf<keyof TestSubject>().toEqualTypeOf<ReadonlyKeys<TestSubject>>()
  })

  it('should match [labels: CreateLabelCommand[]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('labels')
      .toEqualTypeOf<CreateLabelCommand[]>()
  })
})
