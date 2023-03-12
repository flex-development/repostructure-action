/**
 * @file Type Tests - StripRepo
 * @module rice-action/types/tests/unit-d/StripRepo
 */

import type { Endpoint } from '#src/enums'
import type { Endpoints } from '@octokit/types'
import type TestSubject from '../strip-repo'

describe('unit-d:types/StripRepo', () => {
  type T = Endpoints[Endpoint.ENVIRONMENT_DELETE]['parameters']

  it('should remove "owner" property', () => {
    expectTypeOf<T>().toHaveProperty('owner')
    expectTypeOf<TestSubject<T>>().not.toHaveProperty('owner')
  })

  it('should remove "repo" property', () => {
    expectTypeOf<T>().toHaveProperty('repo')
    expectTypeOf<TestSubject<T>>().not.toHaveProperty('repo')
  })
})
