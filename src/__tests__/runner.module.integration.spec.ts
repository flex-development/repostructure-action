/**
 * @file Integration Tests - RunnerModule
 * @module tests/integration/RunnerModule
 */

import data from '#fixtures/api.github.com/graphql.json' assert { type: 'json' }
import INPUT_CONFIG from '#fixtures/input-config.fixture'
import {
  ManageBranchProtectionsCommand,
  ManageBranchProtectionsHandler
} from '#src/branches'
import {
  ManageEnvironmentsCommand,
  ManageEnvironmentsHandler
} from '#src/environments/commands'
import { ManageLabelsCommand, ManageLabelsHandler } from '#src/labels/commands'
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
              apps: ['dependabot', data.data.organization.login]
            },
            last_push_approval: false
          },
          restrictions: { apps: [data.data.organization.login] },
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
          restrictions: { apps: [data.data.organization.login] },
          status_checks: null
        }
      ],
      environments: [
        at(data.data.repository.environments.nodes, -1),
        {
          name: 'docs',
          reviewers: { users: [get(data.data.users, '0.login')] }
        }
      ],
      labels: [
        ...data.data.repository.labels.nodes.slice(5),
        {
          color: faker.color.rgb({ casing: 'lower', prefix: '' }),
          description: 'octokit integration',
          name: 'scope:octokit'
        }
      ]
    })

    builder = Test.createTestingModule({ imports: [TestSubject] })
  })

  beforeEach(() => {
    env((): void => void vi.stubEnv('INPUT_CONFIG', INPUT_CONFIG))

    vi.spyOn(yaml, 'parse').mockImplementationOnce(constant(infrastructure))

    branches = vi.spyOn(ManageBranchProtectionsHandler.prototype, 'execute')
    environments = vi.spyOn(ManageEnvironmentsHandler.prototype, 'execute')
    labels = vi.spyOn(ManageLabelsHandler.prototype, 'execute')

    branches = branches.mockName('ManageBranchProtectionsHandler#execute')
    environments = environments.mockName('ManageEnvironmentsHandler#execute')
    labels = labels.mockName('ManageLabelsHandler#execute')

    commands = [
      [branches, ManageBranchProtectionsCommand],
      [environments, ManageEnvironmentsCommand],
      [labels, ManageLabelsCommand]
    ]
  })

  it('should execute infrastructure management commands', async () => {
    // Act
    await (await builder.compile()).init()

    // Expect
    commands.forEach(([spy, Command]) => {
      expect(spy.mock.calls[0]![0]).to.be.instanceof(Command)
    })
  })
})
