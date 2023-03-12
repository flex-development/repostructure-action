/**
 * @file Type Tests - Branch
 * @module rice-action/interfaces/tests/unit-d/Branch
 */

import type { BranchProtection } from '#src/types'
import type TestSubject from '../branch'

describe('unit-d:interfaces/Branch', () => {
  it('should match [name: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('name').toBeString()
  })

  it('should match [protection?: BranchProtection]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('protection')
      .toEqualTypeOf<BranchProtection | undefined>()
  })
})
