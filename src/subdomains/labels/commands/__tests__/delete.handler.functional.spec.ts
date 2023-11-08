/**
 * @file Functional Tests - DeleteLabelHandler
 * @module repostructure/labels/commands/tests/functional/DeleteLabelHandler
 */

import API_URL from '#fixtures/api-url.fixture'
import CLIENT_MUTATION_ID from '#fixtures/client-mutation-id.fixture'
import type { Config } from '#src/config'
import * as github from '@actions/github'
import { pick, type Nullable } from '@flex-development/tutils'
import { ConfigService } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { Octokit } from '@octokit/core'
import { HttpResponse, http, type GraphQLJsonRequestBody } from 'msw'
import { setupServer, type SetupServer } from 'msw/node'
import DeleteLabelCommand from '../delete.command'
import TestSubject from '../delete.handler'

describe('functional:labels/commands/DeleteLabelHandler', () => {
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
    type Body = GraphQLJsonRequestBody<{ input: { clientMutationId: string } }>
    type Params = Record<string, never>

    server = setupServer(
      http.post<Params, Body>(API_URL, async opts => {
        const { variables } = await opts.request.json()

        return HttpResponse.json({
          data: { payload: pick(variables!.input, ['clientMutationId']) }
        })
      })
    )

    ref = await Test.createTestingModule({
      providers: [
        TestSubject,
        {
          provide: ConfigService,
          useValue: {
            get: vi.fn((key: keyof Config): string => {
              return key === 'id' ? CLIENT_MUTATION_ID : ''
            })
          }
        },
        {
          provide: Octokit,
          useValue: github.getOctokit(import.meta.env.INPUT_TOKEN, {
            baseUrl: import.meta.env.INPUT_API,
            previews: ['bane'],
            request: {
              fetch: async (info: RequestInfo, opts: RequestInit) => {
                return fetch(info, opts)
              }
            }
          })
        }
      ]
    }).compile()

    subject = ref.get(TestSubject)
    server.listen()
  })

  describe('#execute', () => {
    it('should remove repository label', async () => {
      // Arrange
      const id: string = faker.string.nanoid()
      let error: Nullable<Error> = null

      // Act
      try {
        await subject.execute(new DeleteLabelCommand({ id }))
      } catch (e: unknown) {
        error = <Error>e
      }

      // Expect
      expect(error).to.be.null
    })
  })
})
