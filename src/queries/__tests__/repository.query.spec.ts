/**
 * @file Unit Tests - RepositoryQuery
 * @module repostructure/queries/tests/unit/RepositoryQuery
 */

import OWNER from '#fixtures/owner.fixture'
import REPO from '#fixtures/repo.fixture'
import TestSubject from '../repository.query'

describe('unit:queries/RepositoryQuery', () => {
  describe('constructor', () => {
    let subject: TestSubject

    beforeAll(() => {
      subject = new TestSubject({ owner: OWNER, repo: REPO })
    })

    it('should set #owner', () => {
      expect(subject).to.have.property('owner', OWNER)
    })

    it('should set #repo', () => {
      expect(subject).to.have.property('repo', REPO)
    })
  })
})
