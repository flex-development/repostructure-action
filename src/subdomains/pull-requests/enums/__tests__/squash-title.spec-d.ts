/**
 * @file Type Tests - SquashTitle
 * @module pull-requests/enums/tests/unit-d/SquashTitle
 */

import type TestSubject from '../squash-title'

describe('unit-d:pull-requests/enums/SquashTitle', () => {
  it('should match [COMMIT_OR_PR_TITLE = "COMMIT_OR_PR_TITLE"]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('COMMIT_OR_PR_TITLE')
      .toMatchTypeOf<'COMMIT_OR_PR_TITLE'>()
  })

  it('should match [PR_TITLE = "PR_TITLE"]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('PR_TITLE')
      .toMatchTypeOf<'PR_TITLE'>()
  })
})
