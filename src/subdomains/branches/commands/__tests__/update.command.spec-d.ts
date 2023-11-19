/**
 * @file Type Tests - UpdateBranchProtectionCommand
 * @module branches/commands/tests/unit-d/UpdateBranchProtectionCommand
 */

import type { BranchProtectionDTO } from '#src/branches/dto'
import type { ReadonlyKeys } from '@flex-development/tutils'
import type TestSubject from '../update.command'

describe('unit-d:branches/commands/UpdateBranchProtectionCommand', () => {
  it('should extend BranchProtectionDTO', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<BranchProtectionDTO>()
  })

  it('should have all readonly keys', () => {
    expectTypeOf<keyof TestSubject>().toEqualTypeOf<ReadonlyKeys<TestSubject>>()
  })

  it('should match [id: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('id').toEqualTypeOf<string>()
  })
})
