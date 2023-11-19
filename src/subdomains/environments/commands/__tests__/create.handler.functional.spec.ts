/**
 * @file Functional Tests - CreateEnvironmentHandler
 * @module environments/commands/tests/functional/CreateEnvironmentHandler
 */

import data from '#fixtures/api.github.com/graphql.json' assert { type: 'json' }
import CLIENT_MUTATION_ID from '#fixtures/client-mutation-id.fixture'
import OctokitProvider from '#fixtures/octokit.provider.fixture'
import { TeamHandler, TeamsHandler } from '#src/teams/queries'
import { UserHandler, UsersHandler } from '#src/users/queries'
import { get, type Optional } from '@flex-development/tutils'
import { ConfigService } from '@nestjs/config'
import { CqrsModule } from '@nestjs/cqrs'
import { Test, type TestingModule } from '@nestjs/testing'
import { Octokit } from '@octokit/core'
import CreateEnvironmentCommand from '../create.command'
import TestSubject from '../create.handler'
import UpdateEnvironmentHandler from '../update.handler'

describe('functional:environments/commands/CreateEnvironmentHandler', () => {
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
        UpdateEnvironmentHandler,
        UserHandler,
        UsersHandler,
        {
          provide: ConfigService,
          useValue: new ConfigService({
            id: CLIENT_MUTATION_ID,
            node_id: data.data.repository.id,
            owner: data.data.organization.login
          })
        }
      ]
    }).compile()).init()

    octokit = ref.get(Octokit)
    subject = ref.get(TestSubject)
  })

  describe('#execute', () => {
    it('should create environment', async () => {
      // Arrange
      const command: CreateEnvironmentCommand = new CreateEnvironmentCommand({
        name: 'production',
        reviewers: { users: [get(data.data.users, '0.login')] }
      })

      // Act
      vi.spyOn(UpdateEnvironmentHandler.prototype, 'execute')
      vi.spyOn(octokit, 'graphql')
      await subject.execute(command)

      // Expect
      expect(octokit.graphql).toHaveBeenCalledWith({
        input: {
          clientMutationId: CLIENT_MUTATION_ID,
          name: command.name,
          repositoryId: data.data.repository.id
        },
        query: get(subject, 'operation', <Optional<string>>undefined)
      })
      expect(UpdateEnvironmentHandler.prototype.execute).toHaveBeenCalledOnce()
    })
  })
})
