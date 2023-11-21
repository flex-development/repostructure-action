/**
 * @file Type Tests - SquashMessage
 * @module pull-requests/enums/tests/unit-d/SquashMessage
 */

import type TestSubject from '../squash-message'

describe('unit-d:pull-requests/enums/SquashMessage', () => {
  it('should match [BLANK = "BLANK"]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('BLANK')
      .toMatchTypeOf<'BLANK'>()
  })

  it('should match [COMMIT_MESSAGES = "COMMIT_MESSAGES"]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('COMMIT_MESSAGES')
      .toMatchTypeOf<'COMMIT_MESSAGES'>()
  })

  it('should match [PR_BODY = "PR_BODY"]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('PR_BODY')
      .toMatchTypeOf<'PR_BODY'>()
  })
})
