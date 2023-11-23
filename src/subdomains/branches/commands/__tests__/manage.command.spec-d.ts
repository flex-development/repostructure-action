/**
 * @file Type Tests - ManageBranchProtectionsCommand
 * @module branches/commands/tests/unit-d/ManageBranchProtectionsCommand
 */

import type { ReadonlyKeys } from '@flex-development/tutils'
import type CreateBranchProtectionCommand from '../create.command'
import type TestSubject from '../manage.command'

describe('unit-d:branches/commands/ManageBranchProtectionsCommand', () => {
  it('should have all readonly keys', () => {
    expectTypeOf<keyof TestSubject>().toEqualTypeOf<ReadonlyKeys<TestSubject>>()
  })

  it('should match [branches: CreateBranchProtectionCommand[]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('branches')
      .toEqualTypeOf<CreateBranchProtectionCommand[]>()
  })
})
