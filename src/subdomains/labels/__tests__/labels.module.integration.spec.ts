/**
 * @file Integration Tests - LabelsModule
 * @module repostructure/labels/tests/integration/LabelsModule
 */

import data from '#fixtures/api.github.com/graphql.json' assert { type: 'json' }
import INPUT_CONFIG from '#fixtures/input-config.fixture'
import OWNER from '#fixtures/owner.fixture'
import REPO from '#fixtures/repo.fixture'
import { ConfigModule } from '#src/config'
import {
  CreateLabelCommand,
  CreateLabelHandler,
  DeleteLabelCommand,
  DeleteLabelHandler,
  ManageLabelsCommand,
  ManageLabelsHandler,
  UpdateLabelCommand,
  UpdateLabelHandler
} from '#src/labels/commands'
import { LabelsQuery, LabelsQueryHandler } from '#src/labels/queries'
import type { Label } from '#src/labels/types'
import { OctokitModule } from '#src/octokit'
import type { Spy } from '#tests/interfaces'
import env from '#tests/setup/env'
import { at } from '@flex-development/tutils'
import { CommandBus, CqrsModule, QueryBus } from '@nestjs/cqrs'
import { Test, TestingModule } from '@nestjs/testing'
import TestSubject from '../labels.module'

describe('integration:labels/LabelsModule', () => {
  let commands: CommandBus
  let create: Spy<CreateLabelHandler['execute']>
  let list: Spy<LabelsQueryHandler['execute']>
  let manage: Spy<ManageLabelsHandler['execute']>
  let queries: QueryBus
  let ref: TestingModule
  let remove: Spy<DeleteLabelHandler['execute']>
  let spies: Record<string, Spy>
  let update: Spy<UpdateLabelHandler['execute']>

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

    commands = ref.get(CommandBus)
    queries = ref.get(QueryBus)
  })

  beforeEach(() => {
    create = vi.spyOn(CreateLabelHandler.prototype, 'execute')
    list = vi.spyOn(LabelsQueryHandler.prototype, 'execute')
    manage = vi.spyOn(ManageLabelsHandler.prototype, 'execute')
    remove = vi.spyOn(DeleteLabelHandler.prototype, 'execute')
    update = vi.spyOn(UpdateLabelHandler.prototype, 'execute')

    create = create.mockImplementation(async () => (<Label>{}))
    list = list.mockImplementation(async () => [])
    manage = manage.mockImplementation(async () => [])
    remove = remove.mockImplementation(async () => void 0)
    update = update.mockImplementation(async () => (<Label>{}))

    create = create.mockName('CreateLabelHandler#execute')
    list = list.mockName('LabelsQueryHandler#execute')
    manage = manage.mockName('ManageLabelsHandler#execute')
    remove = remove.mockName('DeleteLabelHandler#execute')
    update = update.mockName('UpdateLabelHandler#execute')

    spies = {
      CreateLabelCommand: create,
      DeleteLabelCommand: remove,
      LabelsQuery: list,
      ManageLabelsCommand: manage,
      UpdateLabelCommand: update
    }
  })

  describe('commands', () => {
    describe.each<[
      string,
      | CreateLabelCommand
      | DeleteLabelCommand
      | ManageLabelsCommand
      | UpdateLabelCommand
    ]>([
      ['CreateLabelCommand', new CreateLabelCommand({ color: '', name: '' })],
      ['DeleteLabelCommand', new DeleteLabelCommand({ id: '' })],
      ['ManageLabelsCommand', new ManageLabelsCommand([])],
      [
        'UpdateLabelCommand',
        new UpdateLabelCommand(at(data.data.payload.labels.nodes, 0))
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
    describe.each<[string, LabelsQuery]>([
      ['LabelsQuery', new LabelsQuery({ owner: OWNER, repo: REPO })]
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
