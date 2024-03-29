/**
 * @file Unit Tests - BranchProtectionsHandler
 * @module branches/queries/tests/unit/BranchProtectionsHandler
 */

import api from '#fixtures/api.github.json' assert { type: 'json' }
import OctokitProvider from '#fixtures/octokit.provider.fixture'
import type { BranchProtection } from '#src/branches/types'
import { Test, type TestingModule } from '@nestjs/testing'
import TestSubject from '../branch-protections.handler'
import BranchProtectionsQuery from '../branch-protections.query'

describe('unit:branches/queries/BranchProtectionsHandler', () => {
  let ref: TestingModule
  let subject: TestSubject

  beforeAll(async () => {
    ref = await Test.createTestingModule({
      providers: [OctokitProvider, TestSubject]
    }).compile()

    subject = ref.get(TestSubject)
  })

  describe('#execute', () => {
    let branches: BranchProtection[]

    beforeAll(() => {
      branches = api.graphql.repository.branchProtectionRules.nodes
    })

    it('should return branch protection rules array', async () => {
      // Arrange
      const query: BranchProtectionsQuery = new BranchProtectionsQuery({
        owner: api.graphql.organization.login,
        repo: api.graphql.repository.name
      })

      // Act
      const result = await subject.execute(query)

      // Expect
      expect(result).to.be.an('array').that.is.not.empty
      expect(result).to.have.deep.ordered.members(branches)
    })
  })
})
