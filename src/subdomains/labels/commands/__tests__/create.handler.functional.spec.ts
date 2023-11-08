/**
 * @file Functional Tests - CreateLabelHandler
 * @module repostructure/labels/commands/tests/functional/CreateLabelHandler
 */

import LABELS from '#fixtures/labels.fixture'
import OctokitProvider from '#fixtures/octokit.provider.fixture'
import OWNER from '#fixtures/owner.fixture'
import REPO from '#fixtures/repo.fixture'
import CREATE_LABEL_URL from '#fixtures/url-create-label.fixture'
import type { Config } from '#src/config'
import type { Label } from '#src/labels/types'
import { at, get, type Omit } from '@flex-development/tutils'
import { ConfigService } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { Octokit } from '@octokit/core'
import { http, HttpResponse } from 'msw'
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
    type Body = Omit<Label, 'id'>
    type Params = Record<string, never>

    server = setupServer(
      http.post<Params, Body>(CREATE_LABEL_URL, async opts => {
        return HttpResponse.json({
          ...(await opts.request.json()),
          node_id: faker.string.nanoid()
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
              return key === 'owner' ? OWNER : key === 'repo' ? REPO : ''
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
