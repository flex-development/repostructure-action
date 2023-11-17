/**
 * @file Type Tests - Infrastructure
 * @module types/tests/unit-d/Infrastructure
 */

import type { CreateEnvironmentCommand } from '#src/environments'
import type { CreateLabelCommand } from '#src/labels'
import type TestSubject from '../infrastructure'

describe('unit-d:types/Infrastructure', () => {
  it('should match [environments: CreateEnvironmentCommand[]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('environments')
      .toEqualTypeOf<CreateEnvironmentCommand[]>()
  })

  it('should match [labels: CreateLabelCommand[]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('labels')
      .toEqualTypeOf<CreateLabelCommand[]>()
  })
})
