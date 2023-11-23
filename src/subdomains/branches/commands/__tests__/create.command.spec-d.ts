/**
 * @file Type Tests - CreateBranchProtectionCommand
 * @module branches/commands/tests/unit-d/CreateBranchProtectionCommand
 */

import type { BranchProtectionDTO } from '#src/branches/dto'
import type { BranchProtection } from '#src/branches/types'
import type { ReadonlyKeys } from '@flex-development/tutils'
import type TestSubject from '../create.command'

describe('unit-d:branches/commands/CreateBranchProtectionCommand', () => {
  it('should extend BranchProtectionDTO', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<BranchProtectionDTO>()
  })

  it('should have all readonly keys', () => {
    expectTypeOf<keyof TestSubject>().toEqualTypeOf<ReadonlyKeys<TestSubject>>()
  })

  it('should match [branch: BranchProtection["pattern"]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('branch')
      .toEqualTypeOf<BranchProtection['pattern']>()
  })
})
