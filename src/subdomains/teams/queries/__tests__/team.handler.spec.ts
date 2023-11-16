/**
 * @file Unit Tests - TeamHandler
 * @module teams/queries/tests/unit/TeamHandler
 */

import data from '#fixtures/api.github.com/graphql.json' assert { type: 'json' }
import OctokitProvider from '#fixtures/octokit.provider.fixture'
import type { Team } from '#src/teams/types'
import {
  at,
  regexp,
  type Nullable,
  type ObjectPlain
} from '@flex-development/tutils'
import { Test, TestingModule } from '@nestjs/testing'
import { GraphqlResponseError } from '@octokit/graphql'
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
    let org: string
    let team: Team

    beforeAll(() => {
      org = data.data.organization.login
      team = at(data.data.organization.teams.nodes, 0)
    })

    it('should return team object', async () => {
      // Arrange
      const query: TeamQuery = new TeamQuery({ org, team: team.slug })

      // Act + Expect
      expect(await subject.execute(query)).to.eql(team)
    })

    it('should throw if team is not found', async () => {
      // Arrange
      const team: string = 'team'
      const m: string = `Could not resolve to a Team with the slug of '${team}'`
      let error!: GraphqlResponseError<{ payload: Nullable<ObjectPlain> }>

      // Act
      try {
        await subject.execute(new TeamQuery({ org, team }))
      } catch (e: unknown) {
        error = <typeof error>e
      }

      // Expect
      expect(error).to.be.instanceof(GraphqlResponseError)
      expect(error).to.have.property('message').match(new RegExp(regexp(m)))
    })
  })
})
