/**
 * @file Unit Tests - AppsHandler
 * @module apps/queries/tests/unit/AppsHandler
 */

import apps from '#fixtures/api.github.com/apps.json' assert { type: 'json' }
import OctokitProvider from '#fixtures/octokit.provider.fixture'
import { select } from '@flex-development/tutils'
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
    let slugs: typeof apps[number]['slug'][]

    beforeAll(() => {
      slugs = select(apps, null, app => app.slug)
    })

    it('should return github app objects array', async () => {
      // Act
      const result = await subject.execute(new AppsQuery({ apps: slugs }))

      // Expect
      expect(result).to.have.deep.ordered.members(select(apps, null, app => ({
        id: app.node_id,
        slug: app.slug
      })))
    })
  })
})
