/**
 * @file Type Tests - Infrastructure
 * @module repostructure/types/tests/unit-d/Infrastructure
 */

import type { CreateLabelCommand } from '#src/labels'
import type TestSubject from '../infrastructure'

describe('unit-d:types/Infrastructure', () => {
  it('should match [labels: CreateLabelCommand[]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('labels')
      .toEqualTypeOf<CreateLabelCommand[]>()
  })
})
