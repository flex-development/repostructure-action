/**
 * @file Functional Tests - CreateLabelHandler
 * @module repostructure/labels/commands/tests/functional/CreateLabelHandler
 */

import data from '#fixtures/api.github.com/graphql.json' assert { type: 'json' }
import CLIENT_MUTATION_ID from '#fixtures/client-mutation-id.fixture'
import OctokitProvider from '#fixtures/octokit.provider.fixture'
import { at, get, type Optional } from '@flex-development/tutils'
import { ConfigService } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { Octokit } from '@octokit/core'
import CreateLabelCommand from '../create.command'
import TestSubject from '../create.handler'

describe('functional:labels/commands/CreateLabelHandler', () => {
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
          useValue: new ConfigService({
            id: CLIENT_MUTATION_ID,
            node_id: data.data.repository.id
          })
        }
      ]
    }).compile()

    octokit = ref.get(Octokit)
    subject = ref.get(TestSubject)
  })

  describe('#execute', () => {
    let params: CreateLabelCommand

    beforeAll(() => {
      params = at(data.data.repository.labels.nodes, 0)
    })

    it('should create repository label', async () => {
      // Arrange
      const clientMutationId: string = CLIENT_MUTATION_ID
      const command: CreateLabelCommand = new CreateLabelCommand(params)
      const repositoryId: string = expect.any(String)

      // Act
      vi.spyOn(octokit, 'graphql')
      await subject.execute(command)

      // Expect
      expect(vi.mocked(octokit.graphql)).toHaveBeenCalledOnce()
      expect(vi.mocked(octokit.graphql)).toHaveBeenCalledWith({
        input: { ...command, clientMutationId, repositoryId },
        query: get(subject, 'operation', <Optional<string>>undefined)
      })
    })
  })
})
