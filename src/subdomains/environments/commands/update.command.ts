/**
 * @file Commands - UpdateEnvironmentCommand
 * @module repostructure/environments/commands/UpdateEnvironmentCommand
 */

import type { Reviewers } from '#src/environments/types'
import { get, type Nullable } from '@flex-development/tutils'

/**
 * Environment update command.
 *
 * @see https://docs.github.com/graphql/reference/input-objects#updateenvironmentinput
 *
 * @class
 */
class UpdateEnvironmentCommand {
  /**
   * Node ID of environment to update.
   *
   * @public
   * @readonly
   * @instance
   * @member {string} id
   */
  public readonly id: string

  /**
   * Prevent users from approving their own deployments to this environment.
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
   * Users and teams that can approve deployments to this environment.
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
   * Amount of time (in minutes) to delay a deployment to this environment after
   * a deployment is initially triggered.
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
   * Create a new environment update command.
   *
   * @param {UpdateEnvironmentCommand} params - Command parameters
   */
  constructor(params: UpdateEnvironmentCommand) {
    this.id = params.id
    this.prevent_self_review = get(params, 'prevent_self_review', null)
    this.reviewers = get(params, 'reviewers', null)
    this.wait_timer = get(params, 'wait_timer', null)
  }
}

export default UpdateEnvironmentCommand
