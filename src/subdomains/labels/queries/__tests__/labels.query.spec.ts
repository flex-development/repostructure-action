/**
 * @file Unit Tests - LabelsQuery
 * @module repostructure/labels/queries/tests/unit/LabelsQuery
 */

import OWNER from '#fixtures/owner.fixture'
import REPO from '#fixtures/repo.fixture'
import TestSubject from '../labels.query'

describe('unit:labels/queries/LabelsQuery', () => {
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
