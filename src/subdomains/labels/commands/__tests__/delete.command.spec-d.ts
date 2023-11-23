/**
 * @file Type Tests - DeleteLabelCommand
 * @module labels/commands/tests/unit-d/DeleteLabelCommand
 */

import type { Label } from '#src/labels/types'
import type { ReadonlyKeys } from '@flex-development/tutils'
import type TestSubject from '../delete.command'

describe('unit-d:labels/commands/DeleteLabelCommand', () => {
  it('should have all readonly keys', () => {
    expectTypeOf<keyof TestSubject>().toEqualTypeOf<ReadonlyKeys<TestSubject>>()
  })

  it('should match [id: Label["id"]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('id')
      .toEqualTypeOf<Label['id']>()
  })
})
