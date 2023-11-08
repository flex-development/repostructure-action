/**
 * @file Type Tests - DeleteLabelCommand
 * @module repostructure/labels/commands/tests/unit-d/DeleteLabelCommand
 */

import type { ReadonlyKeys } from '@flex-development/tutils'
import type TestSubject from '../delete.command'

describe('unit-d:labels/commands/DeleteLabelCommand', () => {
  it('should match [readonly id: string]', () => {
    expectTypeOf<ReadonlyKeys<TestSubject>>().extract<'id'>().toBeString()
    expectTypeOf<TestSubject>().toHaveProperty('id').toEqualTypeOf<string>()
  })
})
