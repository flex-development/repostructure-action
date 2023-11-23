/**
 * @file Unit Tests - AppQuery
 * @module apps/queries/tests/unit/AppQuery
 */

import api from '#fixtures/api.github.json' assert { type: 'json' }
import TestSubject from '../app.query'

describe('unit:apps/queries/AppQuery', () => {
  describe('constructor', () => {
    let subject: TestSubject

    beforeAll(() => {
      subject = new TestSubject({ app: api.apps.codecov.slug })
    })

    it('should set #app', () => {
      expect(subject).to.have.property('app', api.apps.codecov.slug)
    })
  })
})
