/**
 * @file Unit Tests - AppsQuery
 * @module apps/queries/tests/unit/AppsQuery
 */

import apps from '#fixtures/api.github.com/apps.json'
import { select } from '@flex-development/tutils'
import TestSubject from '../apps.query'

describe('unit:apps/queries/AppsQuery', () => {
  describe('constructor', () => {
    let slugs: string[]
    let subject: TestSubject

    beforeAll(() => {
      subject = new TestSubject({
        apps: slugs = select(apps, null, app => app.slug)
      })
    })

    it('should set #apps', () => {
      expect(subject).to.have.property('apps').with.ordered.members(slugs)
    })
  })
})
