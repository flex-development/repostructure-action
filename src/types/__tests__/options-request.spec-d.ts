/**
 * @file Type Tests - RequestOptions
 * @module rice-action/types/tests/unit-d/RequestOptions
 */

import type { Endpoint } from '#src/enums'
import type { Endpoints, RequestParameters } from '@octokit/types'
import type Options from '../options'
import type TestSubject from '../options-request'

describe('unit-d:types/RequestOptions', () => {
  type Route = Endpoint.ENVIRONMENTS
  type Subject = TestSubject<Route>

  it('should match Options<Endpoints[Route]>', () => {
    expectTypeOf<Subject>().toMatchTypeOf<Options<Endpoints[Route]>>()
  })

  it('should match RequestParameters', () => {
    expectTypeOf<Subject>().toMatchTypeOf<RequestParameters>()
  })

  it('should omit "headers" property', () => {
    expectTypeOf<Subject>().toHaveProperty('headers').toBeUnknown()
  })

  it('should omit "mediaType" property', () => {
    expectTypeOf<Subject>().toHaveProperty('mediaType').toBeUnknown()
  })
})
