/**
 * @file Functional Tests - CreateEnvironmentHandler
 * @module environments/commands/tests/functional/CreateEnvironmentHandler
 */

import api from '#fixtures/api.github.json' assert { type: 'json' }
import CLIENT_MUTATION_ID from '#fixtures/client-mutation-id.fixture'
import OctokitProvider from '#fixtures/octokit.provider.fixture'
import { Octokit } from '#src/octokit'
import { TeamHandler, TeamsHandler } from '#src/teams/queries'
import { UserHandler, UsersHandler } from '#src/users/queries'
import { get, type Optional } from '@flex-development/tutils'
import { ConfigService } from '@nestjs/config'
import { CqrsModule } from '@nestjs/cqrs'
import { Test, type TestingModule } from '@nestjs/testing'
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
            node_id: api.graphql.repository.id,
            owner: api.graphql.organization.login
          })
        }
      ]
    }).compile()).init()

    octokit = ref.get(Octokit)
    subject = ref.get(TestSubject)
  })

  describe('#execute', () => {
    let command: CreateEnvironmentCommand

    beforeAll(() => {
      command = new CreateEnvironmentCommand({
        name: 'production',
        reviewers: { users: [get(api.graphql.users, '0.login')] }
      })
    })

    beforeEach(async () => {
      vi.spyOn(UpdateEnvironmentHandler.prototype, 'execute')
      vi.spyOn(octokit, 'graphql')

      await subject.execute(command)
    })

    it('should create environment', () => {
      expect(octokit.graphql).toHaveBeenNthCalledWith(1, {
        input: {
          clientMutationId: CLIENT_MUTATION_ID,
          name: command.name,
          repositoryId: api.graphql.repository.id
        },
        query: get(subject, 'operation', <Optional<string>>undefined)
      })
    })

    it('should update new environment', () => {
      expect(UpdateEnvironmentHandler.prototype.execute).toHaveBeenCalled()
    })
  })
})
