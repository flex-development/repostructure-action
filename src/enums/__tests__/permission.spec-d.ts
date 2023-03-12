/**
 * @file Type Tests - Permission
 * @module rice-action/enums/tests/unit-d/Permission
 */

import type TestSubject from '../permission'

describe('unit-d:enums/Permission', () => {
  it('should match [ADMIN = "admin"]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('ADMIN')
      .toMatchTypeOf<'admin'>()
  })

  it('should match [MAINTAIN = "maintain"]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('MAINTAIN')
      .toMatchTypeOf<'maintain'>()
  })

  it('should match [PULL = "pull"]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('PULL')
      .toMatchTypeOf<'pull'>()
  })

  it('should match [PUSH = "push"]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('PUSH')
      .toMatchTypeOf<'push'>()
  })

  it('should match [TRIAGE = "triage"]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('TRIAGE')
      .toMatchTypeOf<'triage'>()
  })
})
