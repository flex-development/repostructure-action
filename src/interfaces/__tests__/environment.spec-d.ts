/**
 * @file Type Tests - Environment
 * @module rice-action/interfaces/tests/unit-d/Environment
 */

import type { Endpoint } from '#src/enums'
import type { Options } from '#src/types'
import type { Endpoints } from '@octokit/types'
import type TestSubject from '../environment'

describe('unit-d:interfaces/Environment', () => {
  it('should extend Options<Endpoints[Endpoint.ENVIRONMENT_UPSERT]>', () => {
    // Arrange
    type Expected = Options<Endpoints[Endpoint.ENVIRONMENT_UPSERT]>

    // Expect
    expectTypeOf<TestSubject>().toMatchTypeOf<Expected>()
  })
})
