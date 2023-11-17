/**
 * @file Integration Tests - EnvironmentsModule
 * @module environments/tests/integration/EnvironmentsModule
 */

import data from '#fixtures/api.github.com/graphql.json' assert { type: 'json' }
import INPUT_CONFIG from '#fixtures/input-config.fixture'
import { ConfigModule } from '#src/config'
import {
  CreateEnvironmentCommand,
  CreateEnvironmentHandler,
  DeleteEnvironmentCommand,
  DeleteEnvironmentHandler,
  ManageEnvironmentsCommand,
  ManageEnvironmentsHandler,
  UpdateEnvironmentCommand,
  UpdateEnvironmentHandler
} from '#src/environments/commands'
import {
  EnvironmentsHandler,
  EnvironmentsQuery
} from '#src/environments/queries'
import { OctokitModule } from '#src/octokit'
import TeamsModule from '#src/teams/teams.module'
import UsersModule from '#src/users/users.module'
import type { Spy } from '#tests/interfaces'
import env from '#tests/setup/env'
import { at } from '@flex-development/tutils'
import { CommandBus, CqrsModule, QueryBus } from '@nestjs/cqrs'
import { Test, type TestingModule } from '@nestjs/testing'
import TestSubject from '../environments.module'

describe('integration:environments/EnvironmentsModule', () => {
  let commands: CommandBus
  let create: Spy<CreateEnvironmentHandler['execute']>
  let list: Spy<EnvironmentsHandler['execute']>
  let manage: Spy<ManageEnvironmentsHandler['execute']>
  let queries: QueryBus
  let ref: TestingModule
  let remove: Spy<DeleteEnvironmentHandler['execute']>
  let spies: Record<string, Spy>
  let update: Spy<UpdateEnvironmentHandler['execute']>

  beforeAll(async () => {
    env((): void => {
      return void vi.stubEnv('INPUT_CONFIG', INPUT_CONFIG)
    })

    ref = await (await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        CqrsModule.forRoot(),
        OctokitModule,
        TeamsModule,
        TestSubject,
        UsersModule
      ]
    }).compile()).init()

    commands = ref.get(CommandBus)
    queries = ref.get(QueryBus)
  })

  beforeEach(() => {
    create = vi.spyOn(CreateEnvironmentHandler.prototype, 'execute')
    list = vi.spyOn(EnvironmentsHandler.prototype, 'execute')
    manage = vi.spyOn(ManageEnvironmentsHandler.prototype, 'execute')
    remove = vi.spyOn(DeleteEnvironmentHandler.prototype, 'execute')
    update = vi.spyOn(UpdateEnvironmentHandler.prototype, 'execute')

    create = create.mockName('CreateEnvironmentHandler#execute')
    list = list.mockName('EnvironmentsHandler#execute')
    manage = manage.mockName('ManageEnvironmentsHandler#execute')
    remove = remove.mockName('DeleteEnvironmentHandler#execute')
    update = update.mockName('UpdateEnvironmentHandler#execute')

    spies = {
      CreateEnvironmentCommand: create,
      DeleteEnvironmentCommand: remove,
      EnvironmentsQuery: list,
      ManageEnvironmentsCommand: manage,
      UpdateEnvironmentCommand: update
    }
  })

  describe('commands', () => {
    describe.each<[
      string,
      | CreateEnvironmentCommand
      | DeleteEnvironmentCommand
      | ManageEnvironmentsCommand
      | UpdateEnvironmentCommand
    ]>([
      [
        'CreateEnvironmentCommand',
        new CreateEnvironmentCommand(
          at(data.data.repository.environments.nodes, -1)
        )
      ],
      [
        'DeleteEnvironmentCommand',
        new DeleteEnvironmentCommand({ id: faker.string.nanoid() })
      ],
      ['ManageEnvironmentsCommand', new ManageEnvironmentsCommand([])],
      [
        'UpdateEnvironmentCommand',
        new UpdateEnvironmentCommand(
          at(data.data.repository.environments.nodes, -1)
        )
      ]
    ])('%s', (key, command) => {
      it('should execute command', async () => {
        // Arrange
        const spy: Spy = spies[key]!

        // Act
        await commands.execute(command)

        // Expect
        expect(spy).toHaveBeenCalledOnce()
        expect(spy).toHaveBeenCalledWith(command)
      })
    })
  })

  describe('queries', () => {
    describe.each<[string, EnvironmentsQuery]>([
      ['EnvironmentsQuery', new EnvironmentsQuery({
        owner: data.data.organization.login,
        repo: data.data.repository.name
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
