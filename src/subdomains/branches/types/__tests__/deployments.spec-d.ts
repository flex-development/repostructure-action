/**
 * @file Type Tests - Deployments
 * @module branches/types/tests/unit-d/Deployments
 */

import type { Environment } from '#src/environments/types'
import type { Nilable } from '@flex-development/tutils'
import type TestSubject from '../deployments'

describe('unit-d:branches/types/Deployments', () => {
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
