/**
 * @file Data Transfer Objects - EnvironmentDTO
 * @module repostructure/environments/dto/EnvironmentDTO
 */

import type { Reviewers } from '#src/environments/types'
import type { Nullable } from '@flex-development/tutils'

/**
 * Environment object data transfer object.
 *
 * @see https://docs.github.com/graphql/reference/input-objects#createenvironmentinput
 * @see https://docs.github.com/graphql/reference/input-objects#updateenvironmentinput
 *
 * @class
 */
class EnvironmentDTO {
  /**
   * Prevent users from approving their own deployments.
   *
   * @default null
   *
   * @public
   * @readonly
   * @instance
   * @member {Nullable<boolean>?} prevent_self_review
   */
  public readonly prevent_self_review?: Nullable<boolean>

  /**
   * Users and teams that can approve deployments.
   *
   * @see {@linkcode Reviewers}
   *
   * @default null
   *
   * @public
   * @readonly
   * @instance
   * @member {Nullable<Partial<Reviewers>>?} reviewers
   */
  public readonly reviewers?: Nullable<Partial<Reviewers>>

  /**
   * Amount of time (in minutes) to delay deployments.
   *
   * The time must be an integer between `0` and `43_200` (`30` days).
   *
   * @default null
   *
   * @public
   * @readonly
   * @instance
   * @member {Nullable<number>?} wait_timer
   */
  public readonly wait_timer?: Nullable<number>

  /**
   * Create a new environment data transfer object.
   *
   * @param {EnvironmentDTO} data - Environment data
   */
  constructor({
    prevent_self_review = null,
    reviewers = null,
    wait_timer = null
  }: EnvironmentDTO) {
    this.prevent_self_review = prevent_self_review
    this.reviewers = reviewers
    this.wait_timer = wait_timer
  }
}

export default EnvironmentDTO
