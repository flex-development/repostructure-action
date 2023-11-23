/**
 * @file Unit Tests - OrganizationQuery
 * @module queries/tests/unit/OrganizationQuery
 */

import api from '#fixtures/api.github.json' assert { type: 'json' }
import TestSubject from '../organization.query'

describe('unit:queries/OrganizationQuery', () => {
  describe('constructor', () => {
    let subject: TestSubject

    beforeAll(() => {
      subject = new TestSubject({ org: api.graphql.organization.login })
    })

    it('should set #org', () => {
      expect(subject).to.have.property('org', api.graphql.organization.login)
    })
  })
})
