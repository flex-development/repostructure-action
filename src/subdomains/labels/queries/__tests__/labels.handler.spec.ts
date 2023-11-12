/**
 * @file Unit Tests - LabelsQueryHandler
 * @module repostructure/labels/queries/tests/unit/LabelsQueryHandler
 */

import data from '#fixtures/api.github.com/graphql.json' assert { type: 'json' }
import OctokitProvider from '#fixtures/octokit.provider.fixture'
import OWNER from '#fixtures/owner.fixture'
import REPO from '#fixtures/repo.fixture'
import type { Label } from '#src/labels/types'
import { Test, TestingModule } from '@nestjs/testing'
import TestSubject from '../labels.handler'
import LabelsQuery from '../labels.query'

describe('unit:labels/queries/LabelsQueryHandler', () => {
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
      labels = data.data.repository.labels.nodes
    })

    it('should return repository labels array', async () => {
      // Arrange
      const query: LabelsQuery = new LabelsQuery({ owner: OWNER, repo: REPO })

      // Act
      const result = await subject.execute(query)

      // Expect
      expect(result).to.be.an('array').that.is.not.empty
      expect(result).to.have.deep.ordered.members(labels)
    })
  })
})
