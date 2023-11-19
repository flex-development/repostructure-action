/**
 * @file Type Tests - StatusChecks
 * @module branches/types/tests/unit-d/StatusChecks
 */

import type { Nilable } from '@flex-development/tutils'
import type StatusCheck from '../status-check'
import type TestSubject from '../status-checks'

describe('unit-d:branches/types/StatusChecks', () => {
  it('should match [checks: StatusCheck[]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('checks')
      .toEqualTypeOf<StatusCheck[]>()
  })

  it('should match [strict?: Nullable<boolean>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('strict')
      .toEqualTypeOf<Nilable<boolean>>()
  })
})
