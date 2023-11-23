/**
 * @file Unit Tests - AppsQuery
 * @module apps/queries/tests/unit/AppsQuery
 */

import api from '#fixtures/api.github.json' assert { type: 'json' }
import { select, values } from '@flex-development/tutils'
import TestSubject from '../apps.query'

describe('unit:apps/queries/AppsQuery', () => {
  describe('constructor', () => {
    let slugs: string[]
    let subject: TestSubject

    beforeAll(() => {
      subject = new TestSubject({
        apps: slugs = select(values(api.apps), null, app => app.slug)
      })
    })

    it('should set #apps', () => {
      expect(subject).to.have.property('apps').with.ordered.members(slugs)
    })
  })
})
