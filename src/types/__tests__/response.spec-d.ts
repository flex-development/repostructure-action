/**
 * @file Type Tests - Response
 * @module rice-action/types/tests/unit-d/Response
 */

import type { Endpoint } from '#src/enums'
import type { ObjectPlain } from '@flex-development/tutils'
import type TestSubject from '../response'

describe('unit-d:types/Response', () => {
  it('should extract "response" property type from Endpoints[Route]', () => {
    // Arrange
    type Route = Endpoint.REPOSITORY

    // Expect
    expectTypeOf<TestSubject<Route>>().toMatchTypeOf<ObjectPlain>()
  })
})
