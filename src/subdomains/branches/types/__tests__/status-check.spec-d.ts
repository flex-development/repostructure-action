/**
 * @file Type Tests - StatusCheck
 * @module branches/types/tests/unit-d/StatusCheck
 */

import type { App } from '#src/apps/types'
import type { Nilable } from '@flex-development/tutils'
import type TestSubject from '../status-check'

describe('unit-d:branches/types/StatusCheck', () => {
  it('should match [app: Nullable<App["slug"]>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('app')
      .toEqualTypeOf<Nilable<App['slug']>>()
  })

  it('should match [context: string]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('context')
      .toEqualTypeOf<string>()
  })
})
