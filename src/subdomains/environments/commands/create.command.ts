/**
 * @file Commands - CreateEnvironmentCommand
 * @module repostructure/environments/commands/CreateEnvironmentCommand
 */

import type { Reviewers } from '#src/environments/types'
import { get, type Nullable } from '@flex-development/tutils'

/**
 * Environment creation command.
 *
 * @see https://docs.github.com/graphql/reference/input-objects#createenvironmentinput
 *
 * @class
 */
class CreateEnvironmentCommand {
  /**
   * Environment name.
   *
   * @public
   * @readonly
   * @instance
   * @member {string} name
   */
  public readonly name: string

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
   * Create a new environment creation command.
   *
   * @param {CreateEnvironmentCommand} params - Command parameters
   */
  constructor(params: CreateEnvironmentCommand) {
    this.name = params.name
    this.prevent_self_review = get(params, 'prevent_self_review', null)
    this.reviewers = get(params, 'reviewers', null)
    this.wait_timer = get(params, 'wait_timer', null)
  }
}

export default CreateEnvironmentCommand
