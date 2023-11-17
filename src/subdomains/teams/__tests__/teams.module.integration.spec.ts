/**
 * @file Integration Tests - TeamsModule
 * @module teams/tests/integration/TeamsModule
 */

import data from '#fixtures/api.github.com/graphql.json' assert { type: 'json' }
import INPUT_CONFIG from '#fixtures/input-config.fixture'
import { ConfigModule } from '#src/config'
import { OctokitModule } from '#src/octokit'
import {
  TeamHandler,
  TeamQuery,
  TeamsHandler,
  TeamsQuery
} from '#src/teams/queries'
import type { Spy } from '#tests/interfaces'
import env from '#tests/setup/env'
import { get, select } from '@flex-development/tutils'
import { CqrsModule, QueryBus } from '@nestjs/cqrs'
import { Test, type TestingModule } from '@nestjs/testing'
import TestSubject from '../teams.module'

describe('integration:teams/TeamsModule', () => {
  let queries: QueryBus
  let ref: TestingModule
  let spies: Record<string, Spy>
  let team: Spy<TeamHandler['execute']>
  let teams: Spy<TeamsHandler['execute']>

  beforeAll(async () => {
    env((): void => {
      return void vi.stubEnv('INPUT_CONFIG', INPUT_CONFIG)
    })

    ref = await (await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        CqrsModule.forRoot(),
        OctokitModule,
        TestSubject
      ]
    }).compile()).init()

    queries = ref.get(QueryBus)
  })

  beforeEach(() => {
    team = vi.spyOn(TeamHandler.prototype, 'execute')
    teams = vi.spyOn(TeamsHandler.prototype, 'execute')

    team = team.mockName('TeamHandler#execute')
    teams = teams.mockName('TeamsHandler#execute')

    spies = { TeamQuery: team, TeamsQuery: teams }
  })

  describe('queries', () => {
    describe.each<[string, TeamQuery | TeamsQuery]>([
      ['TeamQuery', new TeamQuery({
        org: data.data.organization.login,
        team: get(data.data.organization.teams.nodes, '0.slug')
      })],
      ['TeamsQuery', new TeamsQuery({
        org: data.data.organization.login,
        teams: select(data.data.organization.teams.nodes, null, t => t.slug)
      })]
    ])('%s', (key, query) => {
      it('should execute query', async () => {
        // Arrange
        const spy: Spy = spies[key]!

        // Act
        await queries.execute(query)

        // Expect
        expect(spy).toHaveBeenCalledOnce()
        expect(spy).toHaveBeenCalledWith(query)
      })
    })
  })
})
