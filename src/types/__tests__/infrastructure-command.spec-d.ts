/**
 * @file Type Tests - InfrastructureCommand
 * @module types/tests/unit-d/InfrastructureCommand
 */

import type { ManageBranchProtectionsCommand } from '#src/branches'
import type { ManageEnvironmentsCommand } from '#src/environments'
import type { ManageLabelsCommand } from '#src/labels'
import type { ManageSecurityCommand } from '#src/security'
import type TestSubject from '../infrastructure-command'

describe('unit-d:types/InfrastructureCommand', () => {
  it('should extract ManageBranchProtectionsCommand', () => {
    expectTypeOf<TestSubject>()
      .extract<ManageBranchProtectionsCommand>()
      .not.toBeNever()
  })

  it('should extract ManageEnvironmentsCommand', () => {
    expectTypeOf<TestSubject>()
      .extract<ManageEnvironmentsCommand>()
      .not.toBeNever()
  })

  it('should extract ManageLabelsCommand', () => {
    expectTypeOf<TestSubject>()
      .extract<ManageLabelsCommand>()
      .not.toBeNever()
  })

  it('should extract ManageSecurityCommand', () => {
    expectTypeOf<TestSubject>()
      .extract<ManageSecurityCommand>()
      .not.toBeNever()
  })
})
