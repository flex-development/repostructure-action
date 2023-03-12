/**
 * @file Type Tests - Repository
 * @module rice-action/interfaces/tests/unit-d/Repository
 */

import type { Endpoint } from '#src/enums'
import type { Options } from '#src/types'
import type { Endpoints } from '@octokit/types'
import type TestSubject from '../repository'

describe('unit-d:interfaces/Repository', () => {
  it('should extend Options<Endpoints[Endpoint.REPOSITORY]>', () => {
    // Arrange
    type Expected = Options<Endpoints[Endpoint.REPOSITORY]>

    // Expect
    expectTypeOf<TestSubject>().toMatchTypeOf<Expected>()
  })

  it('should match [automated_security_fixes?: boolean]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('automated_security_fixes')
      .toEqualTypeOf<boolean | undefined>()
  })

  it('should match [topics?: string[]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('topics')
      .toEqualTypeOf<string[] | undefined>()
  })

  it('should match [vulnerability_alerts?: boolean]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('vulnerability_alerts')
      .toEqualTypeOf<boolean | undefined>()
  })
})
