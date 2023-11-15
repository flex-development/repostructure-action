/**
 * @file Unit Tests - AppQuery
 * @module repostructure/apps/queries/tests/unit/AppQuery
 */

import app from '#fixtures/api.github.com/apps/github-actions.json'
import TestSubject from '../app.query'

describe('unit:apps/queries/AppQuery', () => {
  describe('constructor', () => {
    let subject: TestSubject

    beforeAll(() => {
      subject = new TestSubject({ app: app.slug })
    })

    it('should set #app', () => {
      expect(subject).to.have.property('app', app.slug)
    })
  })
})
