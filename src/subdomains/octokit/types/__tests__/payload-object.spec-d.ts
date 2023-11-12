/**
 * @file Type Tests - PayloadObject
 * @module repostructure/octokit/types/tests/unit-d/PayloadObject
 */

import type { ObjectPlain } from '@flex-development/tutils'
import type TestSubject from '../payload-object'

describe('unit-d:octokit/types/PayloadObject', () => {
  it('should match [payload: T]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('payload')
      .toEqualTypeOf<ObjectPlain>()
  })
})
