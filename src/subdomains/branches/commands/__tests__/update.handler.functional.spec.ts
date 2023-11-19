/**
 * @file Functional Tests - UpdateBranchProtectionHandler
 * @module branches/commands/tests/functional/UpdateBranchProtectionHandler
 */

import data from '#fixtures/api.github.com/graphql.json' assert { type: 'json' }
import CLIENT_MUTATION_ID from '#fixtures/client-mutation-id.fixture'
import OctokitProvider from '#fixtures/octokit.provider.fixture'
import { AppHandler, AppsHandler } from '#src/apps/queries'
import type { BranchProtection } from '#src/branches/types'
import { TeamHandler, TeamsHandler } from '#src/teams/queries'
import { UserHandler, UsersHandler } from '#src/users/queries'
import { at } from '@flex-development/tutils'
import { ConfigService } from '@nestjs/config'
import { CqrsModule } from '@nestjs/cqrs'
import { Test, type TestingModule } from '@nestjs/testing'
import { Octokit } from '@octokit/core'
import UpdateBranchProtectionCommand from '../update.command'
import TestSubject from '../update.handler'

describe('functional:branches/commands/UpdateBranchProtectionHandler', () => {
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
        UserHandler,
        UsersHandler,
        {
          provide: ConfigService,
          useValue: new ConfigService({
            id: CLIENT_MUTATION_ID,
            owner: data.data.organization.login
          })
        }
      ]
    }).compile()).init()

    octokit = ref.get(Octokit)
    subject = ref.get(TestSubject)
  })

  describe('#execute', () => {
    let command: UpdateBranchProtectionCommand
    let rule: BranchProtection

    beforeAll(() => {
      rule = at(data.data.repository.branchProtectionRules.nodes, -1)

      command = new UpdateBranchProtectionCommand({
        commit_signatures: true,
        conversation_resolution: true,
        creations_blocked: true,
        deletions: false,
        deployments: null,
        enforce_admins: true,
        force_pushers: { apps: ['flex-development'] },
        force_pushes: true,
        fork_syncing: false,
        id: rule.id,
        linear_history: true,
        lock_branch: true,
        pull_requests: {
          approving_review_count: 1,
          bypass_restrictions: null,
          code_owner_reviews: false,
          dismiss_stale_reviews: true,
          dismissal_restrictions: null,
          last_push_approval: false
        },
        restrictions: { apps: ['dependabot', 'flex-development'] },
        status_checks: {
          checks: [
            { context: 'add-to-project' },
            { context: 'auto-merge' },
            { context: 'auto-review' },
            { context: 'build' },
            { context: 'changelog' },
            { app: 'codecov', context: 'codecov/changes' },
            { app: 'codecov', context: 'codecov/patch' },
            { app: 'codecov', context: 'codecov/project' },
            { app: 'codecov', context: 'codecov/project/apps' },
            { app: 'codecov', context: 'codecov/project/branches' },
            { app: 'codecov', context: 'codecov/project/commands' },
            { app: 'codecov', context: 'codecov/project/config' },
            { app: 'codecov', context: 'codecov/project/environments' },
            { app: 'codecov', context: 'codecov/project/labels' },
            { app: 'codecov', context: 'codecov/project/octokit' },
            { app: 'codecov', context: 'codecov/project/queries' },
            { app: 'codecov', context: 'codecov/project/teams' },
            { app: 'codecov', context: 'codecov/project/users' },
            { context: 'commitlint' },
            { context: 'dependabot-rebuild' },
            { context: 'format' },
            { context: 'gitguardian' },
            { context: 'lint' },
            { context: 'spelling' },
            { context: 'test (20)' },
            { context: 'typescript (5.2.2)' }
          ],
          strict: true
        }
      })
    })

    it('should update branch protection rule', async () => {
      // Act
      vi.spyOn(octokit, 'graphql')
      await subject.execute(command)

      // Expect
      expect(vi.mocked(octokit.graphql).mock.lastCall?.[0]).toMatchSnapshot()
    })
  })
})
