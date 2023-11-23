/**
 * @file Type Tests - DeleteEnvironmentCommand
 * @module environments/commands/tests/unit-d/DeleteEnvironmentCommand
 */

import type { Environment } from '#src/environments/types'
import type { ReadonlyKeys } from '@flex-development/tutils'
import type TestSubject from '../delete.command'

describe('unit-d:environments/commands/DeleteEnvironmentCommand', () => {
  it('should have all readonly keys', () => {
    expectTypeOf<keyof TestSubject>().toEqualTypeOf<ReadonlyKeys<TestSubject>>()
  })

  it('should match [id: Environment["id"]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('id')
      .toEqualTypeOf<Environment['id']>()
  })
})
