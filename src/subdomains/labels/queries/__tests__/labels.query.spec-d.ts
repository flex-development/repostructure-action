/**
 * @file Type Tests - LabelsQuery
 * @module repostructure/labels/queries/tests/unit-d/LabelsQuery
 */

import type { RepositoryQuery } from '#src/queries'
import type TestSubject from '../labels.query'

describe('unit-d:labels/queries/LabelsQuery', () => {
  it('should extend RepositoryQuery', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<RepositoryQuery>()
  })
})
