/**
 * @file Functional Tests - ManageLabelsHandler
 * @module repostructure/labels/commands/tests/functional/ManageLabelsHandler
 */

import ApiUrl from '#fixtures/api-url.fixture'
import CLIENT_MUTATION_ID from '#fixtures/client-mutation-id.fixture'
import LABELS from '#fixtures/labels.fixture'
import OctokitProvider from '#fixtures/octokit.provider.fixture'
import OWNER from '#fixtures/owner.fixture'
import REPO from '#fixtures/repo.fixture'
import { LabelsQueryHandler } from '#src/labels/queries'
import type { Spy } from '#tests/interfaces'
import {
  defaults,
  get,
  includes,
  merge,
  type ObjectPlain
} from '@flex-development/tutils'
import { ConfigService } from '@nestjs/config'
import { CqrsModule } from '@nestjs/cqrs'
import { Test, TestingModule } from '@nestjs/testing'
import {
  http,
  HttpResponse,
  type GraphQLJsonRequestBody,
  type PathParams
} from 'msw'
import { setupServer, type SetupServer } from 'msw/node'
import CreateLabelCommand from '../create.command'
import CreateLabelHandler from '../create.handler'
import type DeleteLabelCommand from '../delete.command'
import DeleteLabelHandler from '../delete.handler'
import ManageLabelsCommand from '../manage.command'
import TestSubject from '../manage.handler'
import type UpdateLabelCommand from '../update.command'
import UpdateLabelHandler from '../update.handler'

describe('functional:labels/commands/ManageLabelsHandler', () => {
  let index: number
  let ref: TestingModule
  let server: SetupServer
  let subject: TestSubject

  afterAll(() => {
    server.close()
  })

  afterEach(() => {
    server.resetHandlers()
  })

  beforeAll(async () => {
    type Body = GraphQLJsonRequestBody<ObjectPlain>
    index = 14

    server = setupServer(
      http.post<PathParams, Body>(ApiUrl.GRAPHQL, async opts => {
        const { query, variables } = await opts.request.json()

        /**
         * Mock response data.
         *
         * @var {ObjectPlain} payload
         */
        let payload!: ObjectPlain

        // get response data
        switch (true) {
          case includes(query, 'createLabel'):
            payload = {
              label: defaults(<ObjectPlain>variables!.input, {
                description: null,
                node_id: faker.string.nanoid()
              })
            }
            break
          case includes(query, 'updateLabel'):
            payload = {
              label: merge(
                LABELS.find(label => label.id === get(variables, 'inputs.id'))!,
                <DeleteLabelCommand | UpdateLabelCommand>variables!.input
              )
            }
            break
          case query.startsWith('query'):
            payload = {
              labels: {
                nodes: LABELS.slice(index * 0.5),
                pageInfo: { endCursor: null }
              }
            }
            break
          default:
            payload = { clientMutationId: CLIENT_MUTATION_ID }
            break
        }

        return HttpResponse.json({ data: { payload } })
      })
    )

    ref = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        CreateLabelHandler,
        DeleteLabelHandler,
        LabelsQueryHandler,
        OctokitProvider,
        TestSubject,
        UpdateLabelHandler,
        {
          provide: ConfigService,
          useValue: new ConfigService({
            id: CLIENT_MUTATION_ID,
            owner: OWNER,
            repo: REPO
          })
        }
      ]
    }).compile()

    subject = (await ref.init()).get(TestSubject)
    server.listen()
  })

  describe('#execute', () => {
    let create: Spy<CreateLabelHandler['execute']>
    let list: Spy<LabelsQueryHandler['execute']>
    let remove: Spy<DeleteLabelHandler['execute']>
    let update: Spy<UpdateLabelHandler['execute']>

    beforeEach(() => {
      create = vi.spyOn(CreateLabelHandler.prototype, 'execute')
      list = vi.spyOn(LabelsQueryHandler.prototype, 'execute')
      remove = vi.spyOn(DeleteLabelHandler.prototype, 'execute')
      update = vi.spyOn(UpdateLabelHandler.prototype, 'execute')

      create = create.mockName('CreateLabelHandler#execute')
      list = list.mockName('LabelsQueryHandler#execute')
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
      const labels: CreateLabelCommand[] = LABELS.slice(0, index)
      const command: ManageLabelsCommand = new ManageLabelsCommand(labels)

      // Act
      await subject.execute(command)

      // Expect
      expect(list).toHaveBeenCalledOnce()
      expect(remove).toHaveBeenCalledTimes(LABELS.length - index)
      expect(create).toHaveBeenCalledTimes(index * 0.5)
      expect(update).toHaveBeenCalledTimes(create.mock.calls.length)
    })
  })
})
