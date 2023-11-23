/**
 * @file Functional Tests - UpdateLabelHandler
 * @module labels/commands/tests/functional/UpdateLabelHandler
 */

import api from '#fixtures/api.github.json' assert { type: 'json' }
import CLIENT_MUTATION_ID from '#fixtures/client-mutation-id.fixture'
import OctokitProvider from '#fixtures/octokit.provider.fixture'
import { Octokit } from '#src/octokit'
import { at, get, type Optional } from '@flex-development/tutils'
import { ConfigService } from '@nestjs/config'
import { Test, type TestingModule } from '@nestjs/testing'
import UpdateLabelCommand from '../update.command'
import TestSubject from '../update.handler'

describe('functional:labels/commands/UpdateLabelHandler', () => {
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
    let params: UpdateLabelCommand

    beforeAll(() => {
      params = at(api.graphql.repository.labels.nodes, 0)
    })

    it('should update repository label', async () => {
      // Arrange
      const command: UpdateLabelCommand = new UpdateLabelCommand(params)

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
