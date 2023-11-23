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
    let org: string
    let slugs: string[]
    let teams: Team[]

    beforeAll(() => {
      org = api.graphql.organization.login
      teams = api.graphql.organization.teams.nodes
      slugs = select(teams, null, team => team.slug)
    })

    it('should return team objects array', async () => {
      // Arrange
      const query: TeamsQuery = new TeamsQuery({ org, teams: slugs })

      // Act + Expect
      expect(await subject.execute(query)).to.have.deep.ordered.members(teams)
    })
  })
})
