/**
 * @file Type Tests - UpdateLabelCommand
 * @module labels/commands/tests/unit-d/UpdateLabelCommand
 */

import type { LabelDTO } from '#src/labels/dto'
import type { Label } from '#src/labels/types'
import type { Nilable, ReadonlyKeys } from '@flex-development/tutils'
import type TestSubject from '../update.command'

describe('unit-d:labels/commands/UpdateLabelCommand', () => {
  it('should extend LabelDTO', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<LabelDTO>()
  })

  it('should have all readonly keys', () => {
    expectTypeOf<keyof TestSubject>().toEqualTypeOf<ReadonlyKeys<TestSubject>>()
  })

  it('should match [color?: Nullable<string>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('color')
      .toEqualTypeOf<Nilable<string>>()
  })

  it('should match [id: Label["id"]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('id')
      .toEqualTypeOf<Label['id']>()
  })
})
