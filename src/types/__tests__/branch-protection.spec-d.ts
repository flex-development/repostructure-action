/**
 * @file Type Tests - BranchProtection
 * @module rice-action/types/tests/unit-d/BranchProtection
 */

import type { Endpoint } from '#src/enums'
import type { Endpoints } from '@octokit/types'
import type TestSubject from '../branch-protection'
import type Options from '../options'

describe('unit-d:types/BranchProtection', () => {
  it('should equal Options<Endpoints[Endpoint.BRANCH_PROTECTION]>', () => {
    expectTypeOf<TestSubject>().toEqualTypeOf<
      Options<Endpoints[Endpoint.BRANCH_PROTECTION]>
    >()
  })
})
