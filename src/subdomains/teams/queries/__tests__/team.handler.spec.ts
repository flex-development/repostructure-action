/**
 * @file Unit Tests - TeamHandler
 * @module repostructure/teams/queries/tests/unit/TeamHandler
 */

import team from '#fixtures/api.github.com/orgs/flex-development/teams/dependabot-review.json'
import OctokitProvider from '#fixtures/octokit.provider.fixture'
import { Test, TestingModule } from '@nestjs/testing'
import TestSubject from '../team.handler'
import TeamQuery from '../team.query'

describe('unit:teams/queries/TeamHandler', () => {
  let ref: TestingModule
  let subject: TestSubject

  beforeAll(async () => {
    ref = await Test.createTestingModule({
      providers: [OctokitProvider, TestSubject]
    }).compile()

    subject = ref.get(TestSubject)
  })

  describe('#execute', () => {
    it('should return team object', async () => {
      // Arrange
      const query: TeamQuery = new TeamQuery({
        org: team.organization.login,
        team: team.slug
      })

      // Act
      const result = await subject.execute(query)

      // Expect
      expect(result).to.eql({ id: team.node_id, slug: team.slug })
    })
  })
})
