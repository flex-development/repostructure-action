/**
 * @file Type Tests - DeleteBranchProtectionCommand
 * @module branches/commands/tests/unit-d/DeleteBranchProtectionCommand
 */

import type { BranchProtection } from '#src/branches/types'
import type { ReadonlyKeys } from '@flex-development/tutils'
import type TestSubject from '../delete.command'

describe('unit-d:branches/commands/DeleteBranchProtectionCommand', () => {
  it('should have all readonly keys', () => {
    expectTypeOf<keyof TestSubject>().toEqualTypeOf<ReadonlyKeys<TestSubject>>()
  })

  it('should match [id: BranchProtection["id"]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('id')
      .toEqualTypeOf<BranchProtection['id']>()
  })
})
