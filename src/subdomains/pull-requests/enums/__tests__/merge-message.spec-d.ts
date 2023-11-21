/**
 * @file Type Tests - MergeMessage
 * @module pull-requests/enums/tests/unit-d/MergeMessage
 */

import type TestSubject from '../merge-message'

describe('unit-d:pull-requests/enums/MergeMessage', () => {
  it('should match [BLANK = "BLANK"]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('BLANK')
      .toMatchTypeOf<'BLANK'>()
  })

  it('should match [PR_BODY = "PR_BODY"]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('PR_BODY')
      .toMatchTypeOf<'PR_BODY'>()
  })

  it('should match [PR_TITLE = "PR_TITLE"]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('PR_TITLE')
      .toMatchTypeOf<'PR_TITLE'>()
  })
})
