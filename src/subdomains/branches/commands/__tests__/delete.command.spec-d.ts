/**
 * @file Type Tests - DeleteBranchProtectionCommand
 * @module branches/commands/tests/unit-d/DeleteBranchProtectionCommand
 */

import type { ReadonlyKeys } from '@flex-development/tutils'
import type TestSubject from '../delete.command'

describe('unit-d:branches/commands/DeleteBranchProtectionCommand', () => {
  it('should match [readonly id: string]', () => {
    expectTypeOf<ReadonlyKeys<TestSubject>>().extract<'id'>().toBeString()
    expectTypeOf<TestSubject>().toHaveProperty('id').toEqualTypeOf<string>()
  })
})
