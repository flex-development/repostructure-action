/**
 * @file Unit Tests - ConfigModule
 * @module config/tests/unit/ConfigModule
 */

import data from '#fixtures/api.github.com/graphql.json' assert { type: 'json' }
import CLIENT_MUTATION_ID from '#fixtures/client-mutation-id.fixture'
import INPUT_CONFIG from '#fixtures/input-config.fixture'
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
      expect(await TestSubject.load()).toMatchObject({
        api: import.meta.env.INPUT_API,
        id: CLIENT_MUTATION_ID,
        infrastructure: {
          environments: expect.any(Array),
          labels: expect.any(Array)
        },
        node_id: data.data.repository.id,
        owner: data.data.organization.login,
        repo: data.data.repository.name,
        token: import.meta.env.INPUT_TOKEN
      })
    })
  })
})
