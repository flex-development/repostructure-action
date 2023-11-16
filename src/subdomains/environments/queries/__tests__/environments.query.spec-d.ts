/**
 * @file Type Tests - EnvironmentsQuery
 * @module environments/queries/tests/unit-d/EnvironmentsQuery
 */

import type { RepositoryQuery } from '#src/queries'
import type TestSubject from '../environments.query'

describe('unit-d:environments/queries/EnvironmentsQuery', () => {
  it('should extend RepositoryQuery', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<RepositoryQuery>()
  })
})
