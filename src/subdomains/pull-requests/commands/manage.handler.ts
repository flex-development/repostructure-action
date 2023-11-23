/**
 * @file Commands - ManagePullRequestsHandler
 * @module repostructure/pull-requests/commands/ManagePullRequestsHandler
 */

import type { Config } from '#src/config'
import { Octokit } from '#src/octokit'
import { isNIL, shake, type NIL } from '@flex-development/tutils'
import { ConfigService } from '@nestjs/config'
import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs'
import type { Endpoints } from '@octokit/types'
import ManagePullRequestsCommand from './manage.command'

/**
 * Pull request settings management command handler.
 *
 * @see {@linkcode ManagePullRequestsCommand}
 *
 * @class
 * @extends {ICommandHandler<ManagePullRequestsCommand,void>}
 */
@CommandHandler(ManagePullRequestsCommand)
class ManagePullRequestsHandler
  implements ICommandHandler<ManagePullRequestsCommand, void> {
  /**
   * Create a new pull request settings management command handler.
   *
   * @see {@linkcode ConfigService}
   * @see {@linkcode Config}
   * @see {@linkcode Octokit}
   *
   * @param {Octokit} octokit - Hydrated octokit client
   * @param {ConfigService<Config, true>} config - Infrastructure config service
   */
  constructor(
    protected readonly octokit: Octokit,
    protected readonly config: ConfigService<Config, true>
  ) {}

  /**
   * Execute a pull request settings management command.
   *
   * @see {@linkcode ManagePullRequestsCommand}
   *
   * @public
   * @async
   *
   * @param {ManagePullRequestsCommand} command - Command to execute
   * @return {Promise<void>} Nothing when complete
   */
  public async execute(command: ManagePullRequestsCommand): Promise<void> {
    const {
      auto_merge,
      delete_branch_on_merge,
      merge,
      merge_message,
      merge_title,
      rebase,
      squash,
      squash_message,
      squash_title,
      update_branch
    } = shake<ManagePullRequestsCommand, NIL>(command, isNIL)

    return void await this.octokit.rest.repos.update(
      <Endpoints['PATCH /repos/{owner}/{repo}']['parameters']>{
        allow_auto_merge: auto_merge,
        allow_merge_commit: merge,
        allow_rebase_merge: rebase,
        allow_squash_merge: squash,
        allow_update_branch: update_branch,
        delete_branch_on_merge,
        merge_commit_message: merge_message,
        merge_commit_title: merge_title,
        owner: this.config.get<string>('owner'),
        repo: this.config.get<string>('repo'),
        squash_merge_commit_message: squash_message,
        squash_merge_commit_title: squash_title
      }
    )
  }
}

export default ManagePullRequestsHandler
