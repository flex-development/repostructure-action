/**
 * @file Integration Tests - RunnerModule
 * @module tests/integration/RunnerModule
 */

import api from '#fixtures/api.github.json' assert { type: 'json' }
import INPUT_CONFIG from '#fixtures/input-config.fixture'
import {
  ManageBranchProtectionsCommand,
  ManageBranchProtectionsHandler
} from '#src/branches'
import {
  ManageEnvironmentsCommand,
  ManageEnvironmentsHandler
} from '#src/environments'
import { ManageLabelsCommand, ManageLabelsHandler } from '#src/labels'
import {
  ManagePullRequestsCommand,
  ManagePullRequestsHandler,
  MergeMessage,
  MergeTitle,
  SquashMessage,
  SquashTitle
} from '#src/pull-requests'
import { ManageSecurityCommand, ManageSecurityHandler } from '#src/security'
import type { Infrastructure, InfrastructureCommand } from '#src/types'
import type { Spy } from '#tests/interfaces'
import env from '#tests/setup/env'
import {
  at,
  clone,
  constant,
  get,
  type Constructor
} from '@flex-development/tutils'
import { Test, type TestingModuleBuilder } from '@nestjs/testing'
import * as yaml from 'yaml'
import TestSubject from '../runner.module'

vi.mock('yaml', async og => ({ parse: vi.fn((await og<typeof yaml>()).parse) }))

describe('integration:RunnerModule', () => {
  let branches: Spy<ManageBranchProtectionsHandler['execute']>
  let builder: TestingModuleBuilder
  let commands: [Spy, Constructor<InfrastructureCommand>][]
  let environments: Spy<ManageEnvironmentsHandler['execute']>
  let infrastructure: Infrastructure
  let labels: Spy<ManageLabelsHandler['execute']>
  let pull_requests: Spy<ManagePullRequestsHandler['execute']>
  let security: Spy<ManageSecurityHandler['execute']>

  beforeAll(() => {
    infrastructure = clone({
      branches: [
        {
          branch: 'main',
          commit_signatures: true,
          conversation_resolution: true,
          creations_blocked: true,
          deletions: false,
          deployments: null,
          enforce_admins: false,
          force_pushers: null,
          force_pushes: true,
          fork_syncing: false,
          linear_history: true,
          lock_branch: false,
          pull_requests: {
            approving_review_count: 1,
            bypass_restrictions: null,
            dismiss_stale_reviews: true,
            dismissal_restrictions: {
              apps: ['dependabot', api.graphql.organization.login]
            },
            last_push_approval: false
          },
          restrictions: { apps: [api.graphql.organization.login] },
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
        },
        {
          branch: 'release/*',
          commit_signatures: true,
          conversation_resolution: false,
          creations_blocked: true,
          deletions: true,
          deployments: null,
          enforce_admins: true,
          force_pushers: null,
          force_pushes: false,
          fork_syncing: false,
          linear_history: true,
          lock_branch: false,
          pull_requests: null,
          restrictions: { apps: [api.graphql.organization.login] },
          status_checks: null
        }
      ],
      environments: [
        at(api.graphql.repository.environments.nodes, -1),
        {
          name: 'docs',
          reviewers: { users: [get(api.graphql.users, '0.login')] }
        }
      ],
      labels: [
        ...api.graphql.repository.labels.nodes.slice(5),
        {
          color: faker.color.rgb({ casing: 'lower', prefix: '' }),
          description: 'octokit integration',
          name: 'scope:octokit'
        }
      ],
      pull_requests: {
        auto_merge: true,
        delete_branch_on_merge: true,
        merge: false,
        merge_message: MergeMessage.BLANK,
        merge_title: MergeTitle.PR_TITLE,
        rebase: true,
        squash: true,
        squash_message: SquashMessage.BLANK,
        squash_title: SquashTitle.PR_TITLE,
        update_branch: true
      },
      security: {
        advanced_security: null,
        automated_security_fixes: true,
        secret_scanning: true,
        secret_scanning_push_protection: true,
        vulnerability_alerts: true,
        vulnerability_reporting: true
      }
    })

    builder = Test.createTestingModule({ imports: [TestSubject] })
  })

  beforeEach(() => {
    env((): void => void vi.stubEnv('INPUT_CONFIG', INPUT_CONFIG))

    vi.spyOn(yaml, 'parse').mockImplementationOnce(constant(infrastructure))

    branches = vi.spyOn(ManageBranchProtectionsHandler.prototype, 'execute')
    environments = vi.spyOn(ManageEnvironmentsHandler.prototype, 'execute')
    labels = vi.spyOn(ManageLabelsHandler.prototype, 'execute')
    pull_requests = vi.spyOn(ManagePullRequestsHandler.prototype, 'execute')
    security = vi.spyOn(ManageSecurityHandler.prototype, 'execute')

    branches = branches.mockName('ManageBranchProtectionsHandler#execute')
    environments = environments.mockName('ManageEnvironmentsHandler#execute')
    labels = labels.mockName('ManageLabelsHandler#execute')
    pull_requests = pull_requests.mockName('ManagePullRequestsHandler#execute')
    security = security.mockName('ManageSecurityHandler#execute')

    commands = [
      [branches, ManageBranchProtectionsCommand],
      [environments, ManageEnvironmentsCommand],
      [labels, ManageLabelsCommand],
      [pull_requests, ManagePullRequestsCommand],
      [security, ManageSecurityCommand]
    ]
  })

  it('should execute infrastructure management commands', async () => {
    // Act
    await (await builder.compile()).init()

    // Expect
    commands.forEach(([spy, Command]) => {
      expect(spy.mock.lastCall![0]).to.be.instanceof(Command)
    })
  })
})
