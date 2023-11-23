/**
 * @file Type Tests - CreateEnvironmentCommand
 * @module environments/commands/tests/unit-d/CreateEnvironmentCommand
 */

import type { EnvironmentDTO } from '#src/environments/dto'
import type { Environment } from '#src/environments/types'
import type { ReadonlyKeys } from '@flex-development/tutils'
import type TestSubject from '../create.command'

describe('unit-d:environments/commands/CreateEnvironmentCommand', () => {
  it('should extend EnvironmentDTO', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<EnvironmentDTO>()
  })

  it('should have all readonly keys', () => {
    expectTypeOf<keyof TestSubject>().toEqualTypeOf<ReadonlyKeys<TestSubject>>()
  })

  it('should match [environment: Environment["name"]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('environment')
      .toEqualTypeOf<Environment['name']>()
  })
})
