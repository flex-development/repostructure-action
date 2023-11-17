/**
 * @file Functional Tests - ManageLabelsHandler
 * @module labels/commands/tests/functional/ManageLabelsHandler
 */

import data from '#fixtures/api.github.com/graphql.json' assert { type: 'json' }
import CLIENT_MUTATION_ID from '#fixtures/client-mutation-id.fixture'
import OctokitProvider from '#fixtures/octokit.provider.fixture'
import LabelsHandler from '#src/labels/queries/labels.handler'
import type { Label } from '#src/labels/types'
import type { Spy } from '#tests/interfaces'
import { ConfigService } from '@nestjs/config'
import { CqrsModule } from '@nestjs/cqrs'
import { Test, type TestingModule } from '@nestjs/testing'
import CreateLabelCommand from '../create.command'
import CreateLabelHandler from '../create.handler'
import DeleteLabelHandler from '../delete.handler'
import ManageLabelsCommand from '../manage.command'
import TestSubject from '../manage.handler'
import UpdateLabelHandler from '../update.handler'

describe('functional:labels/commands/ManageLabelsHandler', () => {
  let ref: TestingModule
  let subject: TestSubject

  beforeAll(async () => {
    ref = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        CreateLabelHandler,
        DeleteLabelHandler,
        LabelsHandler,
        OctokitProvider,
        TestSubject,
        UpdateLabelHandler,
        {
          provide: ConfigService,
          useValue: new ConfigService({
            id: CLIENT_MUTATION_ID,
            node_id: data.data.repository.id,
            owner: data.data.organization.login,
            repo: data.data.repository.name
          })
        }
      ]
    }).compile()

    subject = (await ref.init()).get(TestSubject)
  })

  describe('#execute', () => {
    let current: CreateLabelCommand[]
    let create: Spy<CreateLabelHandler['execute']>
    let incoming: CreateLabelCommand[]
    let list: Spy<LabelsHandler['execute']>
    let nodes: Label[]
    let remove: Spy<DeleteLabelHandler['execute']>
    let update: Spy<UpdateLabelHandler['execute']>

    beforeAll(() => {
      incoming = [
        {
          color: faker.color.rgb({ casing: 'lower', prefix: '' }),
          description: 'repository labels',
          name: 'scope:labels'
        },
        {
          color: faker.color.rgb({ casing: 'lower', prefix: '' }),
          description: 'octokit integration',
          name: 'scope:octokit'
        }
      ]

      nodes = data.data.repository.labels.nodes
      current = nodes.slice(0, 10)
    })

    beforeEach(() => {
      create = vi.spyOn(CreateLabelHandler.prototype, 'execute')
      list = vi.spyOn(LabelsHandler.prototype, 'execute')
      remove = vi.spyOn(DeleteLabelHandler.prototype, 'execute')
      update = vi.spyOn(UpdateLabelHandler.prototype, 'execute')

      create = create.mockName('CreateLabelHandler#execute')
      list = list.mockName('LabelsHandler#execute')
      remove = remove.mockName('DeleteLabelHandler#execute')
      update = update.mockName('UpdateLabelHandler#execute')
    })

    it('should do nothing given zero repository labels', async () => {
      // Act
      await subject.execute(new ManageLabelsCommand([]))

      // Expect
      expect(create).not.toHaveBeenCalled()
      expect(list).not.toHaveBeenCalled()
      expect(remove).not.toHaveBeenCalled()
      expect(update).not.toHaveBeenCalled()
    })

    it('should manage repository labels', async () => {
      // Arrange
      const command: ManageLabelsCommand = new ManageLabelsCommand([
        ...incoming,
        ...current
      ])

      // Act
      await subject.execute(command)

      // Expect
      expect(list).toHaveBeenCalledOnce()
      expect(remove).toHaveBeenCalledTimes(nodes.length - current.length)
      expect(create).toHaveBeenCalledTimes(incoming.length)
      expect(update).toHaveBeenCalledTimes(current.length)
    })
  })
})
