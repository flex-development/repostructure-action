/**
 * @file Unit Tests - LabelsHandler
 * @module labels/queries/tests/unit/LabelsHandler
 */

import api from '#fixtures/api.github.json' assert { type: 'json' }
import OctokitProvider from '#fixtures/octokit.provider.fixture'
import type { Label } from '#src/labels/types'
import { Test, type TestingModule } from '@nestjs/testing'
import TestSubject from '../labels.handler'
import LabelsQuery from '../labels.query'

describe('unit:labels/queries/LabelsHandler', () => {
  let ref: TestingModule
  let subject: TestSubject

  beforeAll(async () => {
    ref = await Test.createTestingModule({
      providers: [OctokitProvider, TestSubject]
    }).compile()

    subject = ref.get(TestSubject)
  })

  describe('#execute', () => {
    let labels: Label[]

    beforeAll(() => {
      labels = api.graphql.repository.labels.nodes
    })

    it('should return repository labels array', async () => {
      // Arrange
      const query: LabelsQuery = new LabelsQuery({
        owner: api.graphql.organization.login,
        repo: api.graphql.repository.name
      })

      // Act
      const result = await subject.execute(query)

      // Expect
      expect(result).to.be.an('array').that.is.not.empty
      expect(result).to.have.deep.ordered.members(labels)
    })
  })
})
