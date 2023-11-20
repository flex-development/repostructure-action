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
import type { Nilable } from '@flex-development/tutils'

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
   * @public
   * @readonly
   * @instance
   * @member {Nilable<boolean>?} commit_signatures
   */
  public readonly commit_signatures?: Nilable<boolean>

  /**
   * Require all conversations on code to be resolved before a pull request can
   * be merged into matching branches.
   *
   * @public
   * @readonly
   * @instance
   * @member {Nilable<boolean>?} conversation_resolution
   */
  public readonly conversation_resolution?: Nilable<boolean>

  /**
   * Block pushes that create new matching branches, unless initiated by a user,
   * team, or app with the ability to push.
   *
   * @public
   * @readonly
   * @instance
   * @member {Nilable<boolean>?} creations_blocked
   */
  public readonly creations_blocked?: Nilable<boolean>

  /**
   * Allow matching branches to be deleted.
   *
   * @public
   * @readonly
   * @instance
   * @member {Nilable<boolean>?} deletions
   */
  public readonly deletions?: Nilable<boolean>

  /**
   * Deployment environment protections.
   *
   * @see {@linkcode DeploymentProtection}
   *
   * @public
   * @readonly
   * @instance
   * @member {Nilable<DeploymentProtection>?} deployments
   */
  public readonly deployments?: Nilable<DeploymentProtection>

  /**
   * Enforce protection rule for administrators.
   *
   * @public
   * @readonly
   * @instance
   * @member {Nilable<boolean>?} enforce_admins
   */
  public readonly enforce_admins?: Nilable<boolean>

  /**
   * Users, teams, and apps allowed to force push to matching branches.
   *
   * @see {@linkcode BranchActors}
   *
   * @public
   * @readonly
   * @instance
   * @member {Nilable<BranchActors>?} force_pushers
   */
  public readonly force_pushers?: Nilable<BranchActors>

  /**
   * Allow force pushes to matching branches.
   *
   * @public
   * @readonly
   * @instance
   * @member {Nilable<boolean>?} force_pushes
   */
  public readonly force_pushes?: Nilable<boolean>

  /**
   * Allow users to pull changes from upstream when matching branches are
   * locked.
   *
   * @public
   * @readonly
   * @instance
   * @member {Nilable<boolean>?} fork_syncing
   */
  public readonly fork_syncing?: Nilable<boolean>

  /**
   * Prevent merge commits from being pushed to matching branches.
   *
   * @public
   * @readonly
   * @instance
   * @member {Nilable<boolean>?} linear_history
   */
  public readonly linear_history?: Nilable<boolean>

  /**
   * Mark matching branches as read-only.
   *
   * @public
   * @readonly
   * @instance
   * @member {Nilable<boolean>?} lock_branch
   */
  public readonly lock_branch?: Nilable<boolean>

  /**
   * Pull request protections.
   *
   * @see {@linkcode PullRequestProtection}
   *
   * @public
   * @readonly
   * @instance
   * @member {Nilable<PullRequestProtection>?} pull_requests
   */
  public readonly pull_requests?: Nilable<PullRequestProtection>

  /**
   * Users, teams, and apps allowed to push to matching branches.
   *
   * @see {@linkcode BranchActors}
   *
   * @public
   * @readonly
   * @instance
   * @member {Nilable<BranchActors>?} restrictions
   */
  public readonly restrictions?: Nilable<BranchActors>

  /**
   * Required status checks.
   *
   * @see {@linkcode StatusChecks}
   *
   * @public
   * @readonly
   * @instance
   * @member {Nilable<StatusChecks>?} status_checks
   */
  public readonly status_checks?: Nilable<StatusChecks>

  /**
   * Create a new branch protection rule data transfer object.
   *
   * @param {BranchProtectionDTO} [data={}] - Branch protection data
   */
  constructor({
    commit_signatures,
    conversation_resolution,
    creations_blocked,
    deletions,
    deployments,
    enforce_admins,
    force_pushers,
    force_pushes,
    fork_syncing,
    linear_history,
    lock_branch,
    pull_requests,
    restrictions,
    status_checks
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
