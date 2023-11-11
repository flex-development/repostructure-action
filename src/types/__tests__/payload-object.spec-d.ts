/**
 * @file Type Tests - PayloadObject
 * @module repostructure/types/tests/unit-d/PayloadObject
 */

import type { ObjectPlain } from '@flex-development/tutils'
import type TestSubject from '../payload-object'

describe('unit-d:types/PayloadObject', () => {
  it('should match [payload: T]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('payload')
      .toEqualTypeOf<ObjectPlain>()
  })
})
