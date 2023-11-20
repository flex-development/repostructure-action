/**
 * @file Functional Tests - CreateBranchProtectionHandler
 * @module branches/commands/tests/functional/CreateBranchProtectionHandler
 */

import data from '#fixtures/api.github.com/graphql.json' assert { type: 'json' }
import CLIENT_MUTATION_ID from '#fixtures/client-mutation-id.fixture'
import OctokitProvider from '#fixtures/octokit.provider.fixture'
import { AppHandler, AppsHandler } from '#src/apps/queries'
import { TeamHandler, TeamsHandler } from '#src/teams/queries'
import { UserHandler, UsersHandler } from '#src/users/queries'
import { get, type Optional } from '@flex-development/tutils'
import { ConfigService } from '@nestjs/config'
import { CqrsModule } from '@nestjs/cqrs'
import { Test, type TestingModule } from '@nestjs/testing'
import { Octokit } from '@octokit/core'
import type { CreateBranchProtectionRuleInput } from '@octokit/graphql-schema'
import CreateBranchProtectionCommand from '../create.command'
import TestSubject from '../create.handler'
import UpdateBranchProtectionHandler from '../update.handler'

describe('functional:branches/commands/CreateBranchProtectionHandler', () => {
  let octokit: Octokit
  let ref: TestingModule
  let subject: TestSubject

  beforeAll(async () => {
    ref = await (await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        AppHandler,
        AppsHandler,
        OctokitProvider,
        TeamHandler,
        TeamsHandler,
        TestSubject,
        UpdateBranchProtectionHandler,
        UserHandler,
        UsersHandler,
        {
          provide: ConfigService,
          useValue: new ConfigService({
            id: CLIENT_MUTATION_ID,
            node_id: data.data.repository.id,
            owner: data.data.organization.login
          })
        }
      ]
    }).compile()).init()

    octokit = ref.get(Octokit)
    subject = ref.get(TestSubject)
  })

  describe('#execute', () => {
    let command: CreateBranchProtectionCommand

    beforeAll(() => {
      command = new CreateBranchProtectionCommand({
        branch: 'release/*',
        commit_signatures: true,
        creations_blocked: true,
        deletions: false,
        force_pushes: false,
        linear_history: true,
        pull_requests: {
          approving_review_count: 1,
          bypass_restrictions: null,
          code_owner_reviews: false,
          dismiss_stale_reviews: true,
          dismissal_restrictions: null,
          last_push_approval: false
        },
        restrictions: {
          apps: ['flex-development'],
          teams: [],
          users: ['unicornware']
        },
        status_checks: null
      })
    })

    beforeEach(async () => {
      vi.spyOn(UpdateBranchProtectionHandler.prototype, 'execute')
      vi.spyOn(octokit, 'graphql')

      await subject.execute(command)
    })

    it('should create branch protection rule', () => {
      expect(octokit.graphql).toHaveBeenNthCalledWith(1, {
        input: <CreateBranchProtectionRuleInput>{
          clientMutationId: CLIENT_MUTATION_ID,
          pattern: command.branch,
          repositoryId: data.data.repository.id
        },
        query: get(subject, 'operation', <Optional<string>>undefined)
      })
    })

    it('should update new branch protection rule', () => {
      expect(UpdateBranchProtectionHandler.prototype.execute).toHaveBeenCalled()
    })
  })
})
