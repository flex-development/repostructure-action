/**
 * @file Functional Tests - UpdateLabelHandler
 * @module repostructure/labels/commands/tests/functional/UpdateLabelHandler
 */

import API_URL from '#fixtures/api-url.fixture'
import CLIENT_MUTATION_ID from '#fixtures/client-mutation-id.fixture'
import LABELS from '#fixtures/labels.fixture'
import OctokitProvider from '#fixtures/octokit.provider.fixture'
import type { Config } from '#src/config'
import { at, get, merge, type Optional } from '@flex-development/tutils'
import { ConfigService } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { Octokit } from '@octokit/core'
import { http, HttpResponse, type GraphQLJsonRequestBody } from 'msw'
import { setupServer, type SetupServer } from 'msw/node'
import UpdateLabelCommand from '../update.command'
import TestSubject from '../update.handler'

describe('functional:labels/commands/UpdateLabelHandler', () => {
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
    type Body = GraphQLJsonRequestBody<{ input: UpdateLabelCommand }>
    type Params = Record<string, never>

    server = setupServer(
      http.post<Params, Body>(API_URL, async opts => {
        const { variables } = await opts.request.json()

        return HttpResponse.json({
          data: {
            payload: {
              label: merge(
                LABELS.find(label => label.id === variables!.input.id)!,
                variables!.input
              )
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
          useValue: {
            get: vi.fn((key: keyof Config): string => {
              return key === 'id' ? CLIENT_MUTATION_ID : ''
            })
          }
        }
      ]
    }).compile()

    octokit = ref.get(Octokit)
    subject = ref.get(TestSubject)

    server.listen()
  })

  describe('#execute', () => {
    it('should update repository label', async () => {
      // Arrange
      const command: UpdateLabelCommand = new UpdateLabelCommand(at(LABELS, 0))

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
