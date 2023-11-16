/**
 * @file Functional Tests - DeleteEnvironmentHandler
 * @module environments/commands/tests/functional/DeleteEnvironmentHandler
 */

import CLIENT_MUTATION_ID from '#fixtures/client-mutation-id.fixture'
import OctokitProvider from '#fixtures/octokit.provider.fixture'
import { get, type Optional } from '@flex-development/tutils'
import { ConfigService } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { Octokit } from '@octokit/core'
import DeleteEnvironmentCommand from '../delete.command'
import TestSubject from '../delete.handler'

describe('functional:environments/commands/DeleteEnvironmentHandler', () => {
  let octokit: Octokit
  let ref: TestingModule
  let subject: TestSubject

  beforeAll(async () => {
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
  })

  describe('#execute', () => {
    it('should delete environment', async () => {
      // Arrange
      const command: DeleteEnvironmentCommand = new DeleteEnvironmentCommand({
        id: faker.string.nanoid()
      })

      // Act
      vi.spyOn(octokit, 'graphql')
      await subject.execute(command)

      // Expect
      expect(octokit.graphql).toHaveBeenCalledOnce()
      expect(octokit.graphql).toHaveBeenCalledWith({
        input: { ...command, clientMutationId: CLIENT_MUTATION_ID },
        query: get(subject, 'operation', <Optional<string>>undefined)
      })
    })
  })
})
