/**
 * @file Functional Tests - DeleteLabelHandler
 * @module labels/commands/tests/functional/DeleteLabelHandler
 */

import CLIENT_MUTATION_ID from '#fixtures/client-mutation-id.fixture'
import OctokitProvider from '#fixtures/octokit.provider.fixture'
import { get, type Optional } from '@flex-development/tutils'
import { ConfigService } from '@nestjs/config'
import { Test, type TestingModule } from '@nestjs/testing'
import { Octokit } from '@octokit/core'
import DeleteLabelCommand from '../delete.command'
import TestSubject from '../delete.handler'

describe('functional:labels/commands/DeleteLabelHandler', () => {
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
    it('should delete repository label', async () => {
      // Arrange
      const id: string = faker.string.nanoid()
      const command: DeleteLabelCommand = new DeleteLabelCommand({ id })

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
