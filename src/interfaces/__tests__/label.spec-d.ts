/**
 * @file Type Tests - Label
 * @module rice-action/interfaces/tests/unit-d/Label
 */

import type TestSubject from '../label'

describe('unit-d:interfaces/Label', () => {
  it('should match [color?: string]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('color')
      .toEqualTypeOf<string | undefined>()
  })

  it('should match [description?: string]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('description')
      .toEqualTypeOf<string | undefined>()
  })

  it('should match [name: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('name').toBeString()
  })
})
