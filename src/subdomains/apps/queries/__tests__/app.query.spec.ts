/**
 * @file Unit Tests - AppQuery
 * @module apps/queries/tests/unit/AppQuery
 */

import apps from '#fixtures/api.github.com/apps.json' assert { type: 'json' }
import { get } from '@flex-development/tutils'
import TestSubject from '../app.query'

describe('unit:apps/queries/AppQuery', () => {
  describe('constructor', () => {
    let app: string
    let subject: TestSubject

    beforeAll(() => {
      subject = new TestSubject({ app: app = get(apps, '0.slug') })
    })

    it('should set #app', () => {
      expect(subject).to.have.property('app', app)
    })
  })
})
