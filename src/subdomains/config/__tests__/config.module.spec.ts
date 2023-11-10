/**
 * @file Unit Tests - ConfigModule
 * @module repostructure/config/tests/unit/ConfigModule
 */

import ApiUrl from '#fixtures/api-url.fixture'
import CLIENT_MUTATION_ID from '#fixtures/client-mutation-id.fixture'
import INPUT_CONFIG from '#fixtures/input-config.fixture'
import NODE_ID from '#fixtures/node-id.fixture'
import OWNER from '#fixtures/owner.fixture'
import REPO from '#fixtures/repo.fixture'
import env from '#tests/setup/env'
import type { NodeError } from '@flex-development/errnode'
import pathe from '@flex-development/pathe'
import type { EmptyObject } from '@flex-development/tutils'
import { HttpResponse, http, type PathParams } from 'msw'
import { setupServer, type SetupServer } from 'msw/node'
import { fileURLToPath } from 'node:url'
import TestSubject from '../config.module'

describe('unit:config/ConfigModule', () => {
  let server: SetupServer

  afterAll(() => {
    server.close()
  })

  afterEach(() => {
    server.resetHandlers()
  })

  beforeAll(async () => {
    server = setupServer(
      http.get<PathParams, EmptyObject>(ApiUrl.REPO, () => {
        return HttpResponse.json({ node_id: NODE_ID })
      })
    )

    server.listen()
  })

  beforeEach(() => {
    env((): void => {
      return void vi.stubEnv('INPUT_CONFIG', INPUT_CONFIG)
    })
  })

  describe('.forRoot', () => {
    it('should return dynamic global module', () => {
      // Act
      const result = TestSubject.forRoot()

      // Expect
      expect(result).to.have.property('global').be.true
      expect(result).to.have.property('module', TestSubject)
    })
  })

  describe('.infrastructure', () => {
    it('should throw if file extension is invalid', async () => {
      // Arrange
      const workspace: string = import.meta.env.INPUT_WORKSPACE
      const path: string = fileURLToPath(import.meta.url)
      const file: string = pathe.relative(workspace, path)
      let error!: NodeError

      // Act
      try {
        await TestSubject.infrastructure(file, workspace)
      } catch (e: unknown) {
        error = <typeof error>e
      }

      // Expect
      expect(error).to.have.property('code', 'ERR_UNKNOWN_FILE_EXTENSION')
    })
  })

  describe('.load', () => {
    it('should return configuration object', async () => {
      // Act
      const result = await TestSubject.load()

      // Expect
      expect(result).toMatchObject({
        api: import.meta.env.INPUT_API,
        id: CLIENT_MUTATION_ID,
        infrastructure: expect.any(Object),
        node_id: expect.any(String),
        owner: OWNER,
        repo: REPO,
        token: import.meta.env.INPUT_TOKEN
      })
    })
  })
})
