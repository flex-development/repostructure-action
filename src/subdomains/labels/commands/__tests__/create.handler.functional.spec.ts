/**
 * @file Functional Tests - CreateLabelHandler
 * @module repostructure/labels/commands/tests/functional/CreateLabelHandler
 */

import ApiUrl from '#fixtures/api-url.fixture'
import LABELS from '#fixtures/labels.fixture'
import OctokitProvider from '#fixtures/octokit.provider.fixture'
import OWNER from '#fixtures/owner.fixture'
import REPO from '#fixtures/repo.fixture'
import { at, defaults, get, type Writable } from '@flex-development/tutils'
import { ConfigService } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { Octokit } from '@octokit/core'
import { http, HttpResponse, type PathParams } from 'msw'
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
    type Body = Writable<CreateLabelCommand & Record<'owner' | 'repo', string>>

    server = setupServer(
      http.post<PathParams, Body>(ApiUrl.CREATE_LABEL, async opts => {
        return HttpResponse.json(defaults(await opts.request.json(), {
          description: null,
          node_id: faker.string.nanoid()
        }))
      })
    )

    ref = await Test.createTestingModule({
      providers: [
        OctokitProvider,
        TestSubject,
        {
          provide: ConfigService,
          useValue: new ConfigService({ owner: OWNER, repo: REPO })
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
      const command: CreateLabelCommand = new CreateLabelCommand(at(LABELS, 0))
      const endpoint: string = get(subject, 'endpoint')

      // Act
      vi.spyOn(octokit, 'request')
      await subject.execute(command)

      // Expect
      expect(vi.mocked(octokit.request)).toHaveBeenCalledOnce()
      expect(vi.mocked(octokit.request)).toHaveBeenCalledWith(endpoint, {
        ...command,
        owner: OWNER,
        repo: REPO
      })
    })
  })
})
