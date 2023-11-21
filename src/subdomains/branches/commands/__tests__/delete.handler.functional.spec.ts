/**
 * @file Functional Tests - DeleteBranchProtectionHandler
 * @module branches/commands/tests/functional/DeleteBranchProtectionHandler
 */

import CLIENT_MUTATION_ID from '#fixtures/client-mutation-id.fixture'
import OctokitProvider from '#fixtures/octokit.provider.fixture'
import { Octokit } from '#src/octokit'
import { get, type Optional } from '@flex-development/tutils'
import { ConfigService } from '@nestjs/config'
import { Test, type TestingModule } from '@nestjs/testing'
import type { DeleteBranchProtectionRuleInput } from '@octokit/graphql-schema'
import DeleteBranchProtectionCommand from '../delete.command'
import TestSubject from '../delete.handler'

describe('functional:branches/commands/DeleteBranchProtectionHandler', () => {
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
    beforeEach(() => {
      vi.spyOn(octokit, 'graphql')
    })

    it('should delete branch protection rule', async () => {
      // Arrange
      const command: DeleteBranchProtectionCommand =
        new DeleteBranchProtectionCommand({
          id: faker.string.nanoid()
        })

      // Act
      await subject.execute(command)

      // Expect
      expect(octokit.graphql).toHaveBeenCalledOnce()
      expect(octokit.graphql).toHaveBeenCalledWith({
        input: <DeleteBranchProtectionRuleInput>{
          branchProtectionRuleId: command.id,
          clientMutationId: CLIENT_MUTATION_ID
        },
        query: get(subject, 'operation', <Optional<string>>undefined)
      })
    })
  })
})
