/**
 * @file Unit Tests - RepositoryQuery
 * @module queries/tests/unit/RepositoryQuery
 */

import api from '#fixtures/api.github.json' assert { type: 'json' }
import TestSubject from '../repository.query'

describe('unit:queries/RepositoryQuery', () => {
  describe('constructor', () => {
    let subject: TestSubject

    beforeAll(() => {
      subject = new TestSubject({
        owner: api.graphql.organization.login,
        repo: api.graphql.repository.name
      })
    })

    it('should set #owner', () => {
      expect(subject).to.have.property('owner', api.graphql.organization.login)
    })

    it('should set #repo', () => {
      expect(subject).to.have.property('repo', api.graphql.repository.name)
    })
  })
})
