/**
 * @file Unit Tests - AppHandler
 * @module apps/queries/tests/unit/AppHandler
 */

import app from '#fixtures/api.github.com/apps/github-actions.json'
import OctokitProvider from '#fixtures/octokit.provider.fixture'
import { Test, TestingModule } from '@nestjs/testing'
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
      // Arrange
      const query: AppQuery = new AppQuery({ app: app.slug })

      // Act
      const result = await subject.execute(query)

      // Expect
      expect(result).to.eql({ id: app.node_id, slug: app.slug })
    })
  })
})
