/**
 * @file Type Tests - DeleteEnvironmentCommand
 * @module environments/commands/tests/unit-d/DeleteEnvironmentCommand
 */

import type { ReadonlyKeys } from '@flex-development/tutils'
import type TestSubject from '../delete.command'

describe('unit-d:environments/commands/DeleteEnvironmentCommand', () => {
  it('should match [readonly id: string]', () => {
    expectTypeOf<ReadonlyKeys<TestSubject>>().extract<'id'>().toBeString()
    expectTypeOf<TestSubject>().toHaveProperty('id').toEqualTypeOf<string>()
  })
})
