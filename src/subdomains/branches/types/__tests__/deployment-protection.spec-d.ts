/**
 * @file Type Tests - DeploymentProtection
 * @module branches/types/tests/unit-d/DeploymentProtection
 */

import type { Environment } from '#src/environments/types'
import type { Nilable } from '@flex-development/tutils'
import type TestSubject from '../deployment-protection'

describe('unit-d:branches/types/DeploymentProtection', () => {
  it('should match [environments: Environment["name"][]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('environments')
      .toEqualTypeOf<Environment['name'][]>()
  })

  it('should match [strict?: Nullable<boolean>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('strict')
      .toEqualTypeOf<Nilable<boolean>>()
  })
})
