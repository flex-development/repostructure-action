/**
 * @file Unit Tests - OrganizationQuery
 * @module queries/tests/unit/OrganizationQuery
 */

import data from '#fixtures/api.github.com/graphql.json' assert { type: 'json' }
import TestSubject from '../organization.query'

describe('unit:queries/OrganizationQuery', () => {
  describe('constructor', () => {
    let subject: TestSubject

    beforeAll(() => {
      subject = new TestSubject({ org: data.data.organization.login })
    })

    it('should set #org', () => {
      expect(subject).to.have.property('org', data.data.organization.login)
    })
  })
})
