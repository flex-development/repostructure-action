/**
 * @file Type Tests - UpdateEnvironmentCommand
 * @module environments/commands/tests/unit-d/UpdateEnvironmentCommand
 */

import type { EnvironmentDTO } from '#src/environments/dto'
import type { Environment } from '#src/environments/types'
import type { ReadonlyKeys } from '@flex-development/tutils'
import type TestSubject from '../update.command'

describe('unit-d:environments/commands/UpdateEnvironmentCommand', () => {
  it('should extend EnvironmentDTO', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<EnvironmentDTO>()
  })

  it('should have all readonly keys', () => {
    expectTypeOf<keyof TestSubject>().toEqualTypeOf<ReadonlyKeys<TestSubject>>()
  })

  it('should match [id: Environment["id"]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('id')
      .toEqualTypeOf<Environment['id']>()
  })
})
