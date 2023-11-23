/**
 * @file Data Transfer Objects - BranchProtectionDTO
 * @module repostructure/branches/dto/BranchProtectionDTO
 */

import type {
  BranchActors,
  DeploymentProtection,
  PullRequestProtection,
  StatusChecks
} from '#src/branches/types'
import type { Nullable } from '@flex-development/tutils'

/**
 * Branch protection rule data transfer object.
 *
 * @see https://docs.github.com/graphql/reference/input-objects#createbranchprotectionruleinput
 * @see https://docs.github.com/graphql/reference/input-objects#updatebranchprotectionruleinput
 *
 * @class
 */
class BranchProtectionDTO {
  /**
   * Require signed commits.
   *
   * @default null
   *
   * @public
   * @readonly
   * @instance
   * @member {Nullable<boolean>?} commit_signatures
   */
  public readonly commit_signatures?: Nullable<boolean>

  /**
   * Require all conversations on code to be resolved before a pull request can
   * be merged.
   *
   * @default null
   *
   * @public
   * @readonly
   * @instance
   * @member {Nullable<boolean>?} conversation_resolution
   */
  public readonly conversation_resolution?: Nullable<boolean>

  /**
   * Block pushes that create new matching branches, unless initiated by a user,
   * team, or app with the ability to push.
   *
   * @default null
   *
   * @public
   * @readonly
   * @instance
   * @member {Nullable<boolean>?} creations_blocked
   */
  public readonly creations_blocked?: Nullable<boolean>

  /**
   * Allow matching branches to be deleted.
   *
   * @default null
   *
   * @public
   * @readonly
   * @instance
   * @member {Nullable<boolean>?} deletions
   */
  public readonly deletions?: Nullable<boolean>

  /**
   * Require deployments to succeed before branches can be merged.
   *
   * @see {@linkcode DeploymentProtection}
   *
   * @default null
   *
   * @public
   * @readonly
   * @instance
   * @member {Nullable<DeploymentProtection>?} deployments
   */
  public readonly deployments?: Nullable<DeploymentProtection>

  /**
   * Enforce protection rule for administrators.
   *
   * @default null
   *
   * @public
   * @readonly
   * @instance
   * @member {Nullable<boolean>?} enforce_admins
   */
  public readonly enforce_admins?: Nullable<boolean>

  /**
   * Users, teams, and apps allowed to force push.
   *
   * @default null
   *
   * @see {@linkcode BranchActors}
   *
   * @public
   * @readonly
   * @instance
   * @member {Nullable<BranchActors>?} force_pushers
   */
  public readonly force_pushers?: Nullable<BranchActors>

  /**
   * Allow force pushes.
   *
   * @default null
   *
   * @public
   * @readonly
   * @instance
   * @member {Nullable<boolean>?} force_pushes
   */
  public readonly force_pushes?: Nullable<boolean>

  /**
   * Allow users to pull changes from upstream when matching branches are
   * locked.
   *
   * @default null
   *
   * @public
   * @readonly
   * @instance
   * @member {Nullable<boolean>?} fork_syncing
   */
  public readonly fork_syncing?: Nullable<boolean>

  /**
   * Prevent merge commits from being pushed.
   *
   * @default null
   *
   * @public
   * @readonly
   * @instance
   * @member {Nullable<boolean>?} linear_history
   */
  public readonly linear_history?: Nullable<boolean>

  /**
   * Mark matching branches as read-only.
   *
   * @default null
   *
   * @public
   * @readonly
   * @instance
   * @member {Nullable<boolean>?} lock_branch
   */
  public readonly lock_branch?: Nullable<boolean>

  /**
   * Pull request protections.
   *
   * @see {@linkcode PullRequestProtection}
   *
   * @default null
   *
   * @public
   * @readonly
   * @instance
   * @member {Nullable<PullRequestProtection>?} pull_requests
   */
  public readonly pull_requests?: Nullable<PullRequestProtection>

  /**
   * Users, teams, and apps allowed to push.
   *
   * @see {@linkcode BranchActors}
   *
   * @default null
   *
   * @public
   * @readonly
   * @instance
   * @member {Nullable<BranchActors>?} restrictions
   */
  public readonly restrictions?: Nullable<BranchActors>

  /**
   * Required status checks.
   *
   * @see {@linkcode StatusChecks}
   *
   * @default null
   *
   * @public
   * @readonly
   * @instance
   * @member {Nullable<StatusChecks>?} status_checks
   */
  public readonly status_checks?: Nullable<StatusChecks>

  /**
   * Create a new branch protection rule data transfer object.
   *
   * @param {BranchProtectionDTO} [data={}] - Branch protection data
   */
  constructor({
    commit_signatures = null,
    conversation_resolution = null,
    creations_blocked = null,
    deletions = null,
    deployments = null,
    enforce_admins = null,
    force_pushers = null,
    force_pushes = null,
    fork_syncing = null,
    linear_history = null,
    lock_branch = null,
    pull_requests = null,
    restrictions = null,
    status_checks = null
  }: BranchProtectionDTO = {}) {
    this.commit_signatures = commit_signatures
    this.conversation_resolution = conversation_resolution
    this.creations_blocked = creations_blocked
    this.deletions = deletions
    this.deployments = deployments
    this.enforce_admins = enforce_admins
    this.force_pushers = force_pushers
    this.force_pushes = force_pushes
    this.fork_syncing = fork_syncing
    this.linear_history = linear_history
    this.lock_branch = lock_branch
    this.pull_requests = pull_requests
    this.restrictions = restrictions
    this.status_checks = status_checks
  }
}

export default BranchProtectionDTO
