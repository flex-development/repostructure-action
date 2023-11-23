/**
 * @file Functional Tests - CreateLabelHandler
 * @module labels/commands/tests/functional/CreateLabelHandler
 */

import api from '#fixtures/api.github.json' assert { type: 'json' }
import CLIENT_MUTATION_ID from '#fixtures/client-mutation-id.fixture'
import OctokitProvider from '#fixtures/octokit.provider.fixture'
import { Octokit } from '#src/octokit'
import { get, type Optional } from '@flex-development/tutils'
import { ConfigService } from '@nestjs/config'
import { Test, type TestingModule } from '@nestjs/testing'
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
            node_id: api.graphql.repository.id
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
      params = {
        color: faker.color.rgb(),
        name: get(api.graphql.repository.labels.nodes, '0.name')
      }
    })

    it('should create repository label', async () => {
      // Arrange
      const clientMutationId: string = CLIENT_MUTATION_ID
      const command: CreateLabelCommand = new CreateLabelCommand(params)
      const repositoryId: string = api.graphql.repository.id

      // Act
      vi.spyOn(octokit, 'graphql')
      await subject.execute(command)

      // Expect
      expect(octokit.graphql).toHaveBeenCalledOnce()
      expect(octokit.graphql).toHaveBeenCalledWith({
        input: { ...command, clientMutationId, repositoryId },
        query: get(subject, 'operation', <Optional<string>>undefined)
      })
    })
  })
})
