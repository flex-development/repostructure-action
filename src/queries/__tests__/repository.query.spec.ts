/**
 * @file Unit Tests - RepositoryQuery
 * @module repostructure/queries/tests/unit/RepositoryQuery
 */

import data from '#fixtures/api.github.com/graphql.json' assert { type: 'json' }
import TestSubject from '../repository.query'

describe('unit:queries/RepositoryQuery', () => {
  describe('constructor', () => {
    let subject: TestSubject

    beforeAll(() => {
      subject = new TestSubject({
        owner: data.data.organization.login,
        repo: data.data.repository.name
      })
    })

    it('should set #owner', () => {
      expect(subject).to.have.property('owner', data.data.organization.login)
    })

    it('should set #repo', () => {
      expect(subject).to.have.property('repo', data.data.repository.name)
    })
  })
})
