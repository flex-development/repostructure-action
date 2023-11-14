/**
 * @file Unit Tests - BranchesHandler
 * @module repostructure/branches/queries/tests/unit/BranchesHandler
 */

import data from '#fixtures/api.github.com/graphql.json' assert { type: 'json' }
import OctokitProvider from '#fixtures/octokit.provider.fixture'
import OWNER from '#fixtures/owner.fixture'
import REPO from '#fixtures/repo.fixture'
import type { Branch } from '#src/branches/types'
import { Test, TestingModule } from '@nestjs/testing'
import TestSubject from '../branches.handler'
import BranchesQuery from '../branches.query'

describe('unit:branches/queries/BranchesHandler', () => {
  let ref: TestingModule
  let subject: TestSubject

  beforeAll(async () => {
    ref = await Test.createTestingModule({
      providers: [OctokitProvider, TestSubject]
    }).compile()

    subject = ref.get(TestSubject)
  })

  describe('#execute', () => {
    let branches: Branch[]

    beforeAll(() => {
      branches = data.data.repository.branchProtectionRules.nodes
    })

    it('should return protected branch array', async () => {
      // Arrange
      const query: BranchesQuery = new BranchesQuery({
        owner: OWNER,
        repo: REPO
      })

      // Act
      const result = await subject.execute(query)

      // Expect
      expect(result).to.be.an('array').that.is.not.empty
      expect(result).to.have.deep.ordered.members(branches)
    })
  })
})
