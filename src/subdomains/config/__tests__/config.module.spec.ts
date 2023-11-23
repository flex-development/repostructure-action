/**
 * @file Unit Tests - ConfigModule
 * @module config/tests/unit/ConfigModule
 */

import api from '#fixtures/api.github.json' assert { type: 'json' }
import CLIENT_MUTATION_ID from '#fixtures/client-mutation-id.fixture'
import INPUT_CONFIG from '#fixtures/input-config.fixture'
import schema from '#schema' assert { type: 'json' }
import env from '#tests/setup/env'
import type { NodeError } from '@flex-development/errnode'
import pathe from '@flex-development/pathe'
import { constant, type ObjectPlain } from '@flex-development/tutils'
import { fileURLToPath } from 'node:url'
import * as yaml from 'yaml'
import TestSubject from '../config.module'

vi.mock('yaml', async og => ({ parse: vi.fn((await og<typeof yaml>()).parse) }))

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
    let workspace: string

    beforeAll(() => {
      workspace = import.meta.env.INPUT_WORKSPACE
    })

    it('should throw if file extension is invalid', async () => {
      // Arrange
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

    it('should throw if schema is invalid', async () => {
      // Arrange
      const obj: ObjectPlain = { branches: {} }
      let error!: Error

      // Act
      try {
        vi.spyOn(yaml, 'parse').mockImplementationOnce(constant(obj))
        await TestSubject.infrastructure(INPUT_CONFIG, workspace)
      } catch (e: unknown) {
        error = <typeof error>e
      }

      // Expect
      expect(error).to.be.instanceof(Error)
      expect(error).to.have.property('message', 'config/branches must be array')
      expect(error).to.have.property('cause').eql({
        data: obj.branches,
        instancePath: '/branches',
        keyword: 'type',
        message: 'must be array',
        params: { type: 'array' },
        parentSchema: schema.properties.branches,
        schema: 'array',
        schemaPath: '#/properties/branches/type'
      })
    })
  })

  describe('.load', () => {
    it('should return configuration object', async () => {
      expect(await TestSubject.load()).toMatchObject({
        api: import.meta.env.INPUT_API,
        id: CLIENT_MUTATION_ID,
        infrastructure: {
          branches: expect.any(Array),
          environments: expect.any(Array),
          labels: expect.any(Array)
        },
        node_id: api.graphql.repository.id,
        owner: api.graphql.organization.login,
        repo: api.graphql.repository.name,
        token: import.meta.env.INPUT_TOKEN
      })
    })
  })
})
