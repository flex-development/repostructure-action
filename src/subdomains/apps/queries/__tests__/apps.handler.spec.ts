/**
 * @file Unit Tests - AppsHandler
 * @module apps/queries/tests/unit/AppsHandler
 */

import api from '#fixtures/api.github.json' assert { type: 'json' }
import OctokitProvider from '#fixtures/octokit.provider.fixture'
import { select, values } from '@flex-development/tutils'
import { CqrsModule } from '@nestjs/cqrs'
import { Test, type TestingModule } from '@nestjs/testing'
import AppHandler from '../app.handler'
import TestSubject from '../apps.handler'
import AppsQuery from '../apps.query'

describe('unit:apps/queries/AppsHandler', () => {
  let ref: TestingModule
  let subject: TestSubject

  beforeAll(async () => {
    ref = await (await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [OctokitProvider, TestSubject, AppHandler]
    }).compile()).init()

    subject = ref.get(TestSubject)
  })

  describe('#execute', () => {
    let apps: typeof api['apps'][keyof typeof api['apps']][]

    beforeAll(() => {
      apps = values(api.apps)
    })

    it('should return github app objects array', async () => {
      // Act
      const result = await subject.execute(new AppsQuery({
        apps: select(apps, null, app => app.slug)
      }))

      // Expect
      expect(result).to.have.deep.ordered.members(select(apps, null, a => ({
        id: a.node_id,
        slug: a.slug
      })))
    })
  })
})
