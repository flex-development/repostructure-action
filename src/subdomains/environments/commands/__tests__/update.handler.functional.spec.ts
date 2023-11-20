/**
 * @file Functional Tests - UpdateEnvironmentHandler
 * @module environments/commands/tests/functional/UpdateEnvironmentHandler
 */

import data from '#fixtures/api.github.com/graphql.json' assert { type: 'json' }
import CLIENT_MUTATION_ID from '#fixtures/client-mutation-id.fixture'
import OctokitProvider from '#fixtures/octokit.provider.fixture'
import type { Environment } from '#src/environments/types'
import TeamHandler from '#src/teams/queries/team.handler'
import TeamsHandler from '#src/teams/queries/teams.handler'
import type { Team } from '#src/teams/types'
import UserHandler from '#src/users/queries/user.handler'
import UsersHandler from '#src/users/queries/users.handler'
import type { User } from '#src/users/types'
import { at, get, type Optional } from '@flex-development/tutils'
import { ConfigService } from '@nestjs/config'
import { CqrsModule } from '@nestjs/cqrs'
import { Test, type TestingModule } from '@nestjs/testing'
import { Octokit } from '@octokit/core'
import UpdateEnvironmentCommand from '../update.command'
import TestSubject from '../update.handler'

describe('functional:environments/commands/UpdateEnvironmentHandler', () => {
  let octokit: Octokit
  let ref: TestingModule
  let subject: TestSubject

  beforeAll(async () => {
    ref = await (await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        OctokitProvider,
        TeamHandler,
        TeamsHandler,
        TestSubject,
        UserHandler,
        UsersHandler,
        {
          provide: ConfigService,
          useValue: new ConfigService({
            id: CLIENT_MUTATION_ID,
            owner: data.data.organization.login
          })
        }
      ]
    }).compile()).init()

    octokit = ref.get(Octokit)
    subject = ref.get(TestSubject)
  })

  describe('#execute', () => {
    let command: UpdateEnvironmentCommand
    let environment: Environment
    let dependabot_review: Team
    let unicornware: User

    beforeAll(() => {
      environment = at(data.data.repository.environments.nodes, -1)
      dependabot_review = at(data.data.organization.teams.nodes, 0)
      unicornware = at(data.data.users, 0)

      command = new UpdateEnvironmentCommand({
        id: environment.id,
        reviewers: {
          teams: [dependabot_review.slug],
          users: [unicornware.login]
        }
      })
    })

    beforeEach(() => {
      vi.spyOn(octokit, 'graphql')
    })

    it('should update environment', async () => {
      // Act
      await subject.execute(command)

      // Expect
      expect(octokit.graphql).toHaveBeenLastCalledWith({
        input: {
          clientMutationId: CLIENT_MUTATION_ID,
          environmentId: command.id,
          preventSelfReview: command.prevent_self_review,
          reviewers: [unicornware.id, dependabot_review.id],
          waitTimer: command.wait_timer
        },
        query: get(subject, 'operation', <Optional<string>>undefined)
      })
    })
  })
})
