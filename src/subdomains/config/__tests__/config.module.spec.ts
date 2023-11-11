/**
 * @file Unit Tests - ConfigModule
 * @module repostructure/config/tests/unit/ConfigModule
 */

import data from '#fixtures/api.github.com/graphql.json' assert { type: 'json' }
import CLIENT_MUTATION_ID from '#fixtures/client-mutation-id.fixture'
import INPUT_CONFIG from '#fixtures/input-config.fixture'
import OWNER from '#fixtures/owner.fixture'
import REPO from '#fixtures/repo.fixture'
import env from '#tests/setup/env'
import type { NodeError } from '@flex-development/errnode'
import pathe from '@flex-development/pathe'
import { fileURLToPath } from 'node:url'
import TestSubject from '../config.module'

describe('unit:config/ConfigModule', () => {
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
        node_id: data.data.payload.id,
        owner: OWNER,
        repo: REPO,
        token: import.meta.env.INPUT_TOKEN
      })
    })
  })
})
