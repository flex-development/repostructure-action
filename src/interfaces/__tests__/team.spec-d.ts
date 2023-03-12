/**
 * @file Type Tests - Team
 * @module rice-action/interfaces/tests/unit-d/Team
 */

import type { Endpoint, Permission } from '#src/enums'
import type { Options } from '#src/types'
import type { Endpoints } from '@octokit/types'
import type TestSubject from '../team'

describe('unit-d:interfaces/Team', () => {
  it('should extend Options<Endpoints[Endpoint.TEAM_REPO]>', () => {
    // Arrange
    type Expected = Options<Endpoints[Endpoint.TEAM_REPO]>

    // Expect
    expectTypeOf<TestSubject>().toMatchTypeOf<Expected>()
  })

  it('should match [permission?: Permission]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('permission')
      .toEqualTypeOf<Permission | undefined>()
  })
})
