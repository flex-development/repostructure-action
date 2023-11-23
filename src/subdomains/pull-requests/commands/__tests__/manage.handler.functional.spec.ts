/**
 * @file Functional Tests - ManagePullRequestsHandler
 * @module pull-requests/commands/tests/functional/ManagePullRequestsHandler
 */

import api from '#fixtures/api.github.json' assert { type: 'json' }
import OctokitProvider from '#fixtures/octokit.provider.fixture'
import type { Config } from '#src/config'
import { Octokit } from '#src/octokit'
import {
  MergeMessage,
  MergeTitle,
  SquashMessage,
  SquashTitle
} from '#src/pull-requests/enums'
import { ConfigService } from '@nestjs/config'
import { CqrsModule } from '@nestjs/cqrs'
import { Test, type TestingModule } from '@nestjs/testing'
import ManagePullRequestsCommand from '../manage.command'
import TestSubject from '../manage.handler'

describe('functional:pull-requests/commands/ManagePullRequestsHandler', () => {
  let config: ConfigService<Config, true>
  let octokit: Octokit
  let ref: TestingModule
  let subject: TestSubject

  beforeAll(async () => {
    ref = await (await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        OctokitProvider,
        TestSubject,
        {
          provide: ConfigService,
          useValue: new ConfigService({
            owner: api.graphql.organization.login,
            repo: api.graphql.repository.name
          })
        }
      ]
    }).compile()).init()

    config = ref.get(ConfigService)
    octokit = ref.get(Octokit)
    subject = ref.get(TestSubject)
  })

  describe('#execute', () => {
    let command: ManagePullRequestsCommand

    beforeAll(() => {
      command = new ManagePullRequestsCommand({
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
      })
    })

    beforeEach(() => {
      vi.spyOn(octokit.rest.repos, 'update')
    })

    it('should manage pull request settings', async () => {
      // Act
      await subject.execute(command)

      // Expect
      expect(octokit.rest.repos.update).toHaveBeenCalledOnce()
      expect(octokit.rest.repos.update).toHaveBeenCalledWith({
        allow_auto_merge: command.auto_merge,
        allow_merge_commit: command.merge,
        allow_rebase_merge: command.rebase,
        allow_squash_merge: command.squash,
        allow_update_branch: command.update_branch,
        delete_branch_on_merge: command.delete_branch_on_merge,
        merge_message: command.merge_message,
        merge_title: command.merge_title,
        owner: config.get<string>('owner'),
        repo: config.get<string>('repo'),
        squash_merge_message: command.squash_message,
        squash_merge_title: command.squash_title
      })
    })
  })
})
