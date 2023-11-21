/**
 * @file Commands - ManagePullRequestsCommand
 * @module repostructure/pull-requests/commands/ManagePullRequestsCommand
 */

import type {
  MergeMessage,
  MergeTitle,
  SquashMessage,
  SquashTitle
} from '#src/pull-requests/enums'
import type { Nilable } from '@flex-development/tutils'

/**
 * Pull request settings management command.
 *
 * @class
 */
class ManagePullRequestsCommand {
  /**
   * Auto-merge enabled?
   *
   * @public
   * @readonly
   * @instance
   * @member {Nilable<boolean>?} auto_merge
   */
  public readonly auto_merge?: Nilable<boolean>

  /**
   * Automatically delete head branches when pull requests are merged.
   *
   * @public
   * @readonly
   * @instance
   * @member {Nilable<boolean>?} delete_branch_on_merge
   */
  public readonly delete_branch_on_merge?: Nilable<boolean>

  /**
   * Allow merging pull requests with merge commits.
   *
   * @public
   * @readonly
   * @instance
   * @member {Nilable<boolean>?} merge
   */
  public readonly merge?: Nilable<boolean>

  /**
   * Default value for merge commit messages.
   *
   * @see {@linkcode MergeMessage}
   *
   * @public
   * @readonly
   * @instance
   * @member {Nilable<MergeMessage>?} merge_message
   */
  public readonly merge_message?: Nilable<MergeMessage>

  /**
   * Default value for merge commit titles.
   *
   * @see {@linkcode MergeTitle}
   *
   * @public
   * @readonly
   * @instance
   * @member {Nilable<MergeTitle>?} merge_title
   */
  public readonly merge_title?: Nilable<MergeTitle>

  /**
   * Allow rebase-merging pull requests.
   *
   * @public
   * @readonly
   * @instance
   * @member {Nilable<boolean>?} rebase
   */
  public readonly rebase?: Nilable<boolean>

  /**
   * Allow squash-merging pull requests.
   *
   * @public
   * @readonly
   * @instance
   * @member {Nilable<boolean>?} squash
   */
  public readonly squash?: Nilable<boolean>

  /**
   * Default value for squash commit messages.
   *
   * @see {@linkcode SquashMessage}
   *
   * @public
   * @readonly
   * @instance
   * @member {Nilable<SquashMessage>?} squash_message
   */
  public readonly squash_message?: Nilable<SquashMessage>

  /**
   * Default value for squash commit titles.
   *
   * @see {@linkcode SquashTitle}
   *
   * @public
   * @readonly
   * @instance
   * @member {Nilable<SquashTitle>?} squash_title
   */
  public readonly squash_title?: Nilable<SquashTitle>

  /**
   * Always allow a pull request head branch that is behind its base branch to
   * be updated even if not required to be up to date before merging.
   *
   * @public
   * @readonly
   * @instance
   * @member {Nilable<boolean>?} update_branch
   */
  public readonly update_branch?: Nilable<boolean>

  /**
   * Create a new pull request settings management command.
   *
   * @param {ManagePullRequestsCommand} params - Command parameters
   */
  constructor(params: ManagePullRequestsCommand) {
    this.auto_merge = params.auto_merge
    this.delete_branch_on_merge = params.delete_branch_on_merge
    this.merge = params.merge
    this.merge_message = params.merge_message
    this.merge_title = params.merge_title
    this.rebase = params.rebase
    this.squash = params.squash
    this.squash_message = params.squash_message
    this.squash_title = params.squash_title
    this.update_branch = params.update_branch
  }
}

export default ManagePullRequestsCommand
