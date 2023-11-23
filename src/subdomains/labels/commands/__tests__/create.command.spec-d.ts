/**
 * @file Type Tests - CreateLabelCommand
 * @module labels/commands/tests/unit-d/CreateLabelCommand
 */

import type { LabelDTO } from '#src/labels/dto'
import type { Label } from '#src/labels/types'
import type { ReadonlyKeys } from '@flex-development/tutils'
import type TestSubject from '../create.command'

describe('unit-d:labels/commands/CreateLabelCommand', () => {
  it('should extend LabelDTO', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<LabelDTO>()
  })

  it('should have all readonly keys', () => {
    expectTypeOf<keyof TestSubject>().toEqualTypeOf<ReadonlyKeys<TestSubject>>()
  })

  it('should match [color: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('color').toEqualTypeOf<string>()
  })

  it('should match [name: Label["name"]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('name')
      .toEqualTypeOf<Label['name']>()
  })
})
