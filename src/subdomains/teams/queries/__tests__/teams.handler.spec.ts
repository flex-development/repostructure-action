/**
 * @file Unit Tests - TeamsHandler
 * @module teams/queries/tests/unit/TeamsHandler
 */

import api from '#fixtures/api.github.json' assert { type: 'json' }
import OctokitProvider from '#fixtures/octokit.provider.fixture'
import type { Team } from '#src/teams/types'
import { select } from '@flex-development/tutils'
import { CqrsModule } from '@nestjs/cqrs'
import { Test, type TestingModule } from '@nestjs/testing'
import TeamHandler from '../team.handler'
import TestSubject from '../teams.handler'
import TeamsQuery from '../teams.query'

describe('unit:teams/queries/TeamsHandler', () => {
  let ref: TestingModule
  let subject: TestSubject

  beforeAll(async () => {
    ref = await (await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [OctokitProvider, TeamHandler, TestSubject]
    }).compile()).init()

    subject = ref.get(TestSubject)
  })

  describe('#execute', () => {
    let teams: Team[]

    beforeAll(() => {
      teams = api.graphql.organization.teams.nodes
    })

    it('should return team objects array', async () => {
      // Arrange
      const query: TeamsQuery = new TeamsQuery({
        org: api.graphql.organization.login,
        teams: select(teams, null, team => team.slug)
      })

      // Act
      const result = await subject.execute(query)

      // Expect
      expect(result).to.be.an('array').that.is.not.empty
      expect(result).to.have.deep.ordered.members(teams)
    })
  })
})
