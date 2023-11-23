/**
 * @file Functional Tests - UpdateBranchProtectionHandler
 * @module branches/commands/tests/functional/UpdateBranchProtectionHandler
 */

import api from '#fixtures/api.github.json' assert { type: 'json' }
import CLIENT_MUTATION_ID from '#fixtures/client-mutation-id.fixture'
import OctokitProvider from '#fixtures/octokit.provider.fixture'
import { AppHandler, AppsHandler } from '#src/apps/queries'
import type { BranchProtection } from '#src/branches/types'
import { Octokit } from '#src/octokit'
import { TeamHandler, TeamsHandler } from '#src/teams/queries'
import type { Team } from '#src/teams/types'
import { UserHandler, UsersHandler } from '#src/users/queries'
import type { User } from '#src/users/types'
import {
  at,
  get,
  ifelse,
  select,
  type Optional
} from '@flex-development/tutils'
import { ConfigService } from '@nestjs/config'
import { CqrsModule } from '@nestjs/cqrs'
import { Test, type TestingModule } from '@nestjs/testing'
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
            owner: api.graphql.organization.login
          })
        }
      ]
    }).compile()).init()

    octokit = ref.get(Octokit)
    subject = ref.get(TestSubject)
  })

  describe('#execute', () => {
    let codecov: typeof api['apps']['codecov']
    let command: UpdateBranchProtectionCommand
    let dependabot: typeof api['apps']['dependabot']
    let dependabot_review: Team
    let flex_development: typeof api['apps']['flex-development']
    let github_actions: typeof api['apps']['github-actions']
    let rule: BranchProtection
    let unicornware: User

    beforeAll(() => {
      codecov = api.apps.codecov
      dependabot = api.apps.dependabot
      dependabot_review = at(api.graphql.organization.teams.nodes, 0)
      flex_development = api.apps['flex-development']
      github_actions = api.apps['github-actions']
      rule = at(api.graphql.repository.branchProtectionRules.nodes, -1)
      unicornware = at(api.graphql.users, 0)

      command = new UpdateBranchProtectionCommand({
        commit_signatures: true,
        conversation_resolution: true,
        creations_blocked: true,
        deletions: false,
        deployments: null,
        enforce_admins: true,
        force_pushers: null,
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
          dismissal_restrictions: {
            apps: [dependabot.slug, flex_development.slug],
            teams: [dependabot_review.slug]
          },
          last_push_approval: false
        },
        restrictions: {
          apps: [flex_development.slug],
          users: [unicornware.login]
        },
        status_checks: {
          checks: [
            { context: 'add-to-project' },
            { context: 'auto-merge' },
            { context: 'auto-review' },
            { context: 'build' },
            { context: 'changelog' },
            { app: codecov.slug, context: 'codecov/changes' },
            { app: codecov.slug, context: 'codecov/patch' },
            { app: codecov.slug, context: 'codecov/project' },
            { app: codecov.slug, context: 'codecov/project/apps' },
            { app: codecov.slug, context: 'codecov/project/branches' },
            { app: codecov.slug, context: 'codecov/project/commands' },
            { app: codecov.slug, context: 'codecov/project/config' },
            { app: codecov.slug, context: 'codecov/project/environments' },
            { app: codecov.slug, context: 'codecov/project/labels' },
            { app: codecov.slug, context: 'codecov/project/octokit' },
            { app: codecov.slug, context: 'codecov/project/queries' },
            { app: codecov.slug, context: 'codecov/project/teams' },
            { app: codecov.slug, context: 'codecov/project/users' },
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

    beforeEach(() => {
      vi.spyOn(octokit, 'graphql')
    })

    it('should update branch protection rule', async () => {
      // Arrange
      const {
        commit_signatures,
        conversation_resolution,
        creations_blocked,
        deletions,
        enforce_admins,
        force_pushes,
        fork_syncing,
        linear_history,
        lock_branch,
        pull_requests,
        status_checks
      } = command

      // Act
      await subject.execute(command)

      // Expect
      expect(octokit.graphql).toHaveBeenLastCalledWith({
        input: {
          allowsDeletions: deletions,
          allowsForcePushes: force_pushes,
          blocksCreations: creations_blocked,
          branchProtectionRuleId: rule.id,
          bypassForcePushActorIds: null,
          bypassPullRequestActorIds: null,
          clientMutationId: CLIENT_MUTATION_ID,
          dismissesStaleReviews: pull_requests?.dismiss_stale_reviews,
          isAdminEnforced: enforce_admins,
          lockAllowsFetchAndMerge: fork_syncing,
          lockBranch: lock_branch,
          pushActorIds: [flex_development.node_id, unicornware.id],
          requireLastPushApproval: pull_requests?.last_push_approval,
          requiredApprovingReviewCount: pull_requests?.approving_review_count,
          requiredDeploymentEnvironments: null,
          requiredStatusChecks: select(status_checks!.checks, null, check => ({
            appId: ifelse(!check.app, github_actions, codecov).node_id,
            context: check.context
          })),
          requiresApprovingReviews: true,
          requiresCodeOwnerReviews: pull_requests?.code_owner_reviews,
          requiresCommitSignatures: commit_signatures,
          requiresConversationResolution: conversation_resolution,
          requiresDeployments: null,
          requiresLinearHistory: linear_history,
          requiresStatusChecks: true,
          requiresStrictStatusChecks: status_checks?.strict,
          restrictsPushes: true,
          restrictsReviewDismissals: true,
          reviewDismissalActorIds: [
            dependabot.node_id,
            flex_development.node_id,
            dependabot_review.id
          ]
        },
        query: get(subject, 'operation', <Optional<string>>undefined)
      })
    })
  })
})
