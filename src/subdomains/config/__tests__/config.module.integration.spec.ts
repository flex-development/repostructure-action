/**
 * @file Integration Tests - ConfigModule
 * @module repostructure/config/tests/integration/ConfigModule
 */

import ApiUrl from '#fixtures/api-url.fixture'
import INPUT_CONFIG from '#fixtures/input-config.fixture'
import NODE_ID from '#fixtures/node-id.fixture'
import env from '#tests/setup/env'
import type { EmptyObject } from '@flex-development/tutils'
import { ConfigService } from '@nestjs/config'
import { Test, TestingModuleBuilder } from '@nestjs/testing'
import { HttpResponse, http, type PathParams } from 'msw'
import { setupServer, type SetupServer } from 'msw/node'
import TestSubject from '../config.module'

describe('integration:config/ConfigModule', () => {
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
    it('should provide ConfigService', async () => {
      // Arrange
      const ref: TestingModuleBuilder = Test.createTestingModule({
        imports: [TestSubject.forRoot()]
      })

      // Act
      const result = (await ref.compile()).get(ConfigService)

      // Expect
      expect(result).to.be.instanceof(ConfigService)
    })
  })
})
