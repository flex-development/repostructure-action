/**
 * @file Functional Tests - CreateLabelHandler
 * @module repostructure/labels/commands/tests/functional/CreateLabelHandler
 */

import ApiUrl from '#fixtures/api-url.fixture'
import CLIENT_MUTATION_ID from '#fixtures/client-mutation-id.fixture'
import LABELS from '#fixtures/labels.fixture'
import OctokitProvider from '#fixtures/octokit.provider.fixture'
import { at, get, pick, type Optional } from '@flex-development/tutils'
import { ConfigService } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { Octokit } from '@octokit/core'
import {
  HttpResponse,
  http,
  type GraphQLJsonRequestBody,
  type PathParams
} from 'msw'
import { setupServer, type SetupServer } from 'msw/node'
import CreateLabelCommand from '../create.command'
import TestSubject from '../create.handler'

describe('functional:labels/commands/CreateLabelHandler', () => {
  let octokit: Octokit
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
    type Body = GraphQLJsonRequestBody<{ input: CreateLabelCommand }>

    server = setupServer(
      http.post<PathParams, Body>(ApiUrl.GRAPHQL, async opts => {
        const { variables } = await opts.request.json()

        return HttpResponse.json({
          data: {
            payload: {
              label: {
                ...pick(variables!.input, ['color', 'description', 'name']),
                id: faker.string.nanoid()
              }
            }
          }
        })
      })
    )

    ref = await Test.createTestingModule({
      providers: [
        OctokitProvider,
        TestSubject,
        {
          provide: ConfigService,
          useValue: new ConfigService({
            id: CLIENT_MUTATION_ID,
            node_id: faker.string.nanoid()
          })
        }
      ]
    }).compile()

    octokit = ref.get(Octokit)
    subject = ref.get(TestSubject)

    server.listen()
  })

  describe('#execute', () => {
    it('should create repository label', async () => {
      // Arrange
      const clientMutationId: string = CLIENT_MUTATION_ID
      const command: CreateLabelCommand = new CreateLabelCommand(at(LABELS, 0))
      const repositoryId: string = expect.any(String)

      // Act
      vi.spyOn(octokit, 'graphql')
      await subject.execute(command)

      // Expect
      expect(vi.mocked(octokit.graphql)).toHaveBeenCalledOnce()
      expect(vi.mocked(octokit.graphql)).toHaveBeenCalledWith({
        input: { ...command, clientMutationId, repositoryId },
        query: get(subject, 'operation', <Optional<string>>undefined)
      })
    })
  })
})
