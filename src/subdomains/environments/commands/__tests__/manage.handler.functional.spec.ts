/**
 * @file Functional Tests - ManageEnvironmentsHandler
 * @module environments/commands/tests/functional/ManageEnvironmentsHandler
 */

import api from '#fixtures/api.github.json' assert { type: 'json' }
import CLIENT_MUTATION_ID from '#fixtures/client-mutation-id.fixture'
import OctokitProvider from '#fixtures/octokit.provider.fixture'
import { EnvironmentsHandler } from '#src/environments/queries'
import type { Environment } from '#src/environments/types'
import { TeamHandler, TeamsHandler } from '#src/teams/queries'
import { UserHandler, UsersHandler } from '#src/users/queries'
import type { Spy } from '#tests/interfaces'
import { at, get } from '@flex-development/tutils'
import { ConfigService } from '@nestjs/config'
import { CqrsModule } from '@nestjs/cqrs'
import { Test, type TestingModule } from '@nestjs/testing'
import CreateEnvironmentCommand from '../create.command'
import CreateEnvironmentHandler from '../create.handler'
import DeleteEnvironmentHandler from '../delete.handler'
import ManageEnvironmentsCommand from '../manage.command'
import TestSubject from '../manage.handler'
import UpdateEnvironmentHandler from '../update.handler'

describe('functional:environments/commands/ManageEnvironmentsHandler', () => {
  let ref: TestingModule
  let subject: TestSubject

  beforeAll(async () => {
    ref = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        CreateEnvironmentHandler,
        DeleteEnvironmentHandler,
        EnvironmentsHandler,
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
            owner: api.graphql.organization.login,
            repo: api.graphql.repository.name
          })
        }
      ]
    }).compile()

    subject = (await ref.init()).get(TestSubject)
  })

  describe('#execute', () => {
    let current: CreateEnvironmentCommand[]
    let create: Spy<CreateEnvironmentHandler['execute']>
    let incoming: CreateEnvironmentCommand[]
    let list: Spy<EnvironmentsHandler['execute']>
    let nodes: Environment[]
    let remove: Spy<DeleteEnvironmentHandler['execute']>
    let update: Spy<UpdateEnvironmentHandler['execute']>

    beforeAll(() => {
      incoming = [
        {
          name: 'marketplace',
          reviewers: {
            teams: [get(api.graphql.organization.teams.nodes, '0.slug')],
            users: [get(api.graphql.users, '0.login')]
          }
        }
      ]

      nodes = api.graphql.repository.environments.nodes
      current = [at(nodes, -1)]
    })

    beforeEach(() => {
      create = vi.spyOn(CreateEnvironmentHandler.prototype, 'execute')
      list = vi.spyOn(EnvironmentsHandler.prototype, 'execute')
      remove = vi.spyOn(DeleteEnvironmentHandler.prototype, 'execute')
      update = vi.spyOn(UpdateEnvironmentHandler.prototype, 'execute')

      create = create.mockName('CreateEnvironmentHandler#execute')
      list = list.mockName('EnvironmentsHandler#execute')
      remove = remove.mockName('DeleteEnvironmentHandler#execute')
      update = update.mockName('UpdateEnvironmentHandler#execute')
    })

    it('should do nothing given zero environments', async () => {
      // Act
      await subject.execute(new ManageEnvironmentsCommand([]))

      // Expect
      expect(create).not.toHaveBeenCalled()
      expect(list).not.toHaveBeenCalled()
      expect(remove).not.toHaveBeenCalled()
      expect(update).not.toHaveBeenCalled()
    })

    it('should manage environments', async () => {
      // Arrange
      const command: ManageEnvironmentsCommand = new ManageEnvironmentsCommand([
        ...incoming,
        ...current
      ])

      // Act
      await subject.execute(command)

      // Expect
      expect(list).toHaveBeenCalledOnce()
      expect(remove).toHaveBeenCalledTimes(nodes.length - current.length)
      expect(create).toHaveBeenCalledTimes(incoming.length)
      expect(update).toHaveBeenCalledTimes(current.length + incoming.length)
    })
  })
})
