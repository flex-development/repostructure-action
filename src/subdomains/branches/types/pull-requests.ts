/**
 * @file Type Definitions - PullRequests
 * @module repostructure/branches/types/PullRequests
 */

import type { NaturalRange, Nullable } from '@flex-development/tutils'
import type BranchActors from './branch-actors'

/**
 * Pull request protections object.
 */
type PullRequests = {
  /**
   * Number of reviewers required for pull request approval.
   *
   * @maximum 6
   * @minimum 0
   */
  approving_review_count?: Nullable<NaturalRange<7>>

  /**
   * Users, teams, and apps allowed to bypass pull request requirements.
   *
   * @see {@linkcode BranchActors}
   */
  bypass_restrictions?: Nullable<BranchActors>

  /**
   * Block merges until reviewed by a [code owner][1].
   *
   * [1]: https://docs.github.com/articles/about-code-owners/
   */
  code_owner_reviews?: Nullable<boolean>

  /**
   * Dismiss approving reviews when new commits are pushed.
   */
  dismiss_stale_reviews?: Nullable<boolean>

  /**
   * Users, teams, and apps allowed to dismiss pull request reviews.
   *
   * @see {@linkcode BranchActors}
   */
  dismissal_restrictions?: Nullable<BranchActors>

  /**
   * Require the most recent push to be approved by someone other than the most
   * recent pusher.
   */
  last_push_approval?: Nullable<boolean>
}

export type { PullRequests as default }
