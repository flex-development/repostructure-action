/**
 * @file Unit Tests - AppHandler
 * @module apps/queries/tests/unit/AppHandler
 */

import apps from '#fixtures/api.github.com/apps.json' assert { type: 'json' }
import OctokitProvider from '#fixtures/octokit.provider.fixture'
import { at } from '@flex-development/tutils'
import { Test, type TestingModule } from '@nestjs/testing'
import TestSubject from '../app.handler'
import AppQuery from '../app.query'

describe('unit:apps/queries/AppHandler', () => {
  let ref: TestingModule
  let subject: TestSubject

  beforeAll(async () => {
    ref = await Test.createTestingModule({
      providers: [OctokitProvider, TestSubject]
    }).compile()

    subject = ref.get(TestSubject)
  })

  describe('#execute', () => {
    let app: typeof apps[number]

    beforeAll(() => {
      app = at(apps, 0)
    })

    it('should return github app object', async () => {
      // Act
      const result = await subject.execute(new AppQuery({ app: app.slug }))

      // Expect
      expect(result).to.eql({ id: app.node_id, slug: app.slug })
    })
  })
})
