/**
 * @file Type Tests - OrganizationQuery
 * @module queries/tests/unit-d/OrganizationQuery
 */

import type TestSubject from '../organization.query'

describe('unit-d:queries/OrganizationQuery', () => {
  it('should match [org: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('org').toEqualTypeOf<string>()
  })
})
