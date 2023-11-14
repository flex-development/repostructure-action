/**
 * @file Unit Tests - EnvironmentsHandler
 * @module repostructure/environments/queries/tests/unit/EnvironmentsHandler
 */

import data from '#fixtures/api.github.com/graphql.json' assert { type: 'json' }
import OctokitProvider from '#fixtures/octokit.provider.fixture'
import OWNER from '#fixtures/owner.fixture'
import REPO from '#fixtures/repo.fixture'
import type { Environment } from '#src/environments/types'
import { Test, TestingModule } from '@nestjs/testing'
import TestSubject from '../environments.handler'
import EnvironmentsQuery from '../environments.query'

describe('unit:environments/queries/EnvironmentsHandler', () => {
  let ref: TestingModule
  let subject: TestSubject

  beforeAll(async () => {
    ref = await Test.createTestingModule({
      providers: [OctokitProvider, TestSubject]
    }).compile()

    subject = ref.get(TestSubject)
  })

  describe('#execute', () => {
    let environments: Environment[]

    beforeAll(() => {
      environments = data.data.repository.environments.nodes
    })

    it('should return environments array', async () => {
      // Arrange
      const query: EnvironmentsQuery = new EnvironmentsQuery({
        owner: OWNER,
        repo: REPO
      })

      // Act
      const result = await subject.execute(query)

      // Expect
      expect(result).to.be.an('array').that.is.not.empty
      expect(result).to.have.deep.ordered.members(environments)
    })
  })
})
