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
import type { Nullable } from '@flex-development/tutils'

/**
 * Pull request settings management command.
 *
 * @class
 */
class ManagePullRequestsCommand {
  /**
   * Auto-merge enabled?
   *
   * @default null
   *
   * @public
   * @readonly
   * @instance
   * @member {Nullable<boolean>?} auto_merge
   */
  public readonly auto_merge?: Nullable<boolean>

  /**
   * Automatically delete head branches when pull requests are merged.
   *
   * @default null
   *
   * @public
   * @readonly
   * @instance
   * @member {Nullable<boolean>?} delete_branch_on_merge
   */
  public readonly delete_branch_on_merge?: Nullable<boolean>

  /**
   * Allow merging pull requests with merge commits.
   *
   * @default null
   *
   * @public
   * @readonly
   * @instance
   * @member {Nullable<boolean>?} merge
   */
  public readonly merge?: Nullable<boolean>

  /**
   * Default value for merge commit messages.
   *
   * @see {@linkcode MergeMessage}
   *
   * @default null
   *
   * @public
   * @readonly
   * @instance
   * @member {Nullable<MergeMessage>?} merge_message
   */
  public readonly merge_message?: Nullable<MergeMessage>

  /**
   * Default value for merge commit titles.
   *
   * @see {@linkcode MergeTitle}
   *
   * @default null
   *
   * @public
   * @readonly
   * @instance
   * @member {Nullable<MergeTitle>?} merge_title
   */
  public readonly merge_title?: Nullable<MergeTitle>

  /**
   * Allow rebase-merging pull requests.
   *
   * @default null
   *
   * @public
   * @readonly
   * @instance
   * @member {Nullable<boolean>?} rebase
   */
  public readonly rebase?: Nullable<boolean>

  /**
   * Allow squash-merging pull requests.
   *
   * @default null
   *
   * @public
   * @readonly
   * @instance
   * @member {Nullable<boolean>?} squash
   */
  public readonly squash?: Nullable<boolean>

  /**
   * Default value for squash commit messages.
   *
   * @see {@linkcode SquashMessage}
   *
   * @default null
   *
   * @public
   * @readonly
   * @instance
   * @member {Nullable<SquashMessage>?} squash_message
   */
  public readonly squash_message?: Nullable<SquashMessage>

  /**
   * Default value for squash commit titles.
   *
   * @see {@linkcode SquashTitle}
   *
   * @default null
   *
   * @public
   * @readonly
   * @instance
   * @member {Nullable<SquashTitle>?} squash_title
   */
  public readonly squash_title?: Nullable<SquashTitle>

  /**
   * Always allow a pull request head branch that is behind its base branch to
   * be updated even if not required to be up to date before merging.
   *
   * @default null
   *
   * @public
   * @readonly
   * @instance
   * @member {Nullable<boolean>?} update_branch
   */
  public readonly update_branch?: Nullable<boolean>

  /**
   * Create a new pull request settings management command.
   *
   * @param {ManagePullRequestsCommand} params - Command parameters
   */
  constructor({
    auto_merge = null,
    delete_branch_on_merge = null,
    merge = null,
    merge_message = null,
    merge_title = null,
    rebase = null,
    squash = null,
    squash_message = null,
    squash_title = null,
    update_branch = null
  }: ManagePullRequestsCommand) {
    this.auto_merge = auto_merge
    this.delete_branch_on_merge = delete_branch_on_merge
    this.merge = merge
    this.merge_message = merge_message
    this.merge_title = merge_title
    this.rebase = rebase
    this.squash = squash
    this.squash_message = squash_message
    this.squash_title = squash_title
    this.update_branch = update_branch
  }
}

export default ManagePullRequestsCommand
