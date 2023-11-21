/**
 * @file Unit Tests - Octokit
 * @module octokit/models/tests/unit/Octokit
 */

import TestSubject from '../octokit.model'

describe('unit:octokit/models/Octokit', () => {
  describe('constructor', () => {
    let subject: TestSubject

    beforeEach(() => {
      subject = new TestSubject()
    })

    it('should initialize #graphql', () => {
      expect(subject).to.have.property('graphql').be.a('function')
      expect(subject).to.have.nested.property('graphql.paginate')
    })

    it('should initialize #rest', () => {
      expect(subject).to.have.property('rest').be.an('object')
    })
  })
})
