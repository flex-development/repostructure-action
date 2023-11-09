/**
 * @file Functional Tests - DeleteLabelHandler
 * @module repostructure/labels/commands/tests/functional/DeleteLabelHandler
 */

import ApiUrl from '#fixtures/api-url.fixture'
import CLIENT_MUTATION_ID from '#fixtures/client-mutation-id.fixture'
import OctokitProvider from '#fixtures/octokit.provider.fixture'
import { get, type Optional } from '@flex-development/tutils'
import { ConfigService } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { Octokit } from '@octokit/core'
import {
  http,
  HttpResponse,
  type GraphQLJsonRequestBody,
  type PathParams
} from 'msw'
import { setupServer, type SetupServer } from 'msw/node'
import DeleteLabelCommand from '../delete.command'
import TestSubject from '../delete.handler'

describe('functional:labels/commands/DeleteLabelHandler', () => {
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
    type Body = GraphQLJsonRequestBody<{ input: DeleteLabelCommand }>

    server = setupServer(
      http.post<PathParams, Body>(ApiUrl.GRAPHQL, async () => {
        return HttpResponse.json({
          data: {
            payload: { clientMutationId: CLIENT_MUTATION_ID }
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
          useValue: new ConfigService({ id: CLIENT_MUTATION_ID })
        }
      ]
    }).compile()

    octokit = ref.get(Octokit)
    subject = ref.get(TestSubject)

    server.listen()
  })

  describe('#execute', () => {
    it('should delete repository label', async () => {
      // Arrange
      const id: string = faker.string.nanoid()
      const command: DeleteLabelCommand = new DeleteLabelCommand({ id })

      // Act
      vi.spyOn(octokit, 'graphql')
      await subject.execute(command)

      // Expect
      expect(vi.mocked(octokit.graphql)).toHaveBeenCalledOnce()
      expect(vi.mocked(octokit.graphql)).toHaveBeenCalledWith({
        input: { ...command, clientMutationId: CLIENT_MUTATION_ID },
        query: get(subject, 'operation', <Optional<string>>undefined)
      })
    })
  })
})
