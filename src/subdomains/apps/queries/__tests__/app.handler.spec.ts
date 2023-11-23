/**
 * @file Unit Tests - AppHandler
 * @module apps/queries/tests/unit/AppHandler
 */

import api from '#fixtures/api.github.json' assert { type: 'json' }
import OctokitProvider from '#fixtures/octokit.provider.fixture'
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
    it('should return github app object', async () => {
      // Act
      const result = await subject.execute(new AppQuery({
        app: api.apps.dependabot.slug
      }))

      // Expect
      expect(result).to.eql({
        id: api.apps.dependabot.node_id,
        slug: api.apps.dependabot.slug
      })
    })
  })
})
