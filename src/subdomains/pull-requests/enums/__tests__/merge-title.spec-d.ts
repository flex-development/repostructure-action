/**
 * @file Type Tests - MergeTitle
 * @module pull-requests/enums/tests/unit-d/MergeTitle
 */

import type TestSubject from '../merge-title'

describe('unit-d:pull-requests/enums/MergeTitle', () => {
  it('should match [MERGE_MESSAGE = "MERGE_MESSAGE"]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('MERGE_MESSAGE')
      .toMatchTypeOf<'MERGE_MESSAGE'>()
  })

  it('should match [PR_TITLE = "PR_TITLE"]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('PR_TITLE')
      .toMatchTypeOf<'PR_TITLE'>()
  })
})
