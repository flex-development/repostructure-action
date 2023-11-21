/**
 * @file Type Tests - ManageSecurityCommand
 * @module security/commands/tests/unit-d/ManageSecurityCommand
 */

import type { Nilable, ReadonlyKeys } from '@flex-development/tutils'
import type TestSubject from '../manage.command'

describe('unit-d:security/commands/ManageSecurityCommand', () => {
  it('should have all readonly keys', () => {
    expectTypeOf<keyof TestSubject>().toEqualTypeOf<ReadonlyKeys<TestSubject>>()
  })

  it('should match [advanced_security?: Nilable<boolean>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('advanced_security')
      .toEqualTypeOf<Nilable<boolean>>()
  })

  it('should match [automated_security_fixes?: Nilable<boolean>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('automated_security_fixes')
      .toEqualTypeOf<Nilable<boolean>>()
  })

  it('should match [secret_scanning?: Nilable<boolean>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('secret_scanning')
      .toEqualTypeOf<Nilable<boolean>>()
  })

  it('should match [secret_scanning_push_protection?: Nilable<boolean>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('secret_scanning_push_protection')
      .toEqualTypeOf<Nilable<boolean>>()
  })

  it('should match [vulnerability_alerts?: Nilable<boolean>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('vulnerability_alerts')
      .toEqualTypeOf<Nilable<boolean>>()
  })

  it('should match [vulnerability_reporting?: Nilable<boolean>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('vulnerability_reporting')
      .toEqualTypeOf<Nilable<boolean>>()
  })
})
