/**
 * @file Type Tests - ManageEnvironmentsCommand
 * @module environments/commands/tests/unit-d/ManageEnvironmentsCommand
 */

import type { ReadonlyKeys } from '@flex-development/tutils'
import type CreateEnvironmentCommand from '../create.command'
import type TestSubject from '../manage.command'

describe('unit-d:environments/commands/ManageEnvironmentsCommand', () => {
  it('should have all readonly keys', () => {
    expectTypeOf<keyof TestSubject>().toEqualTypeOf<ReadonlyKeys<TestSubject>>()
  })

  it('should match [environments: CreateEnvironmentCommand[]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('environments')
      .toEqualTypeOf<CreateEnvironmentCommand[]>()
  })
})
