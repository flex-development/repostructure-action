/**
 * @file Commands - UpdateLabelCommand
 * @module repostructure/labels/commands/UpdateLabelCommand
 */

import type { Nilable } from '@flex-development/tutils'

/**
 * Label update command.
 *
 * @see https://docs.github.com/graphql/reference/input-objects#updatelabelinput
 *
 * @class
 */
class UpdateLabelCommand {
  /**
   * A `6` character hex code, without the leading #, identifying the updated
   * color of the label.
   *
   * @public
   * @readonly
   * @instance
   * @member {Nilable<string>?} color
   */
  public readonly color?: Nilable<string>

  /**
   * A brief description of the label, such as its purpose.
   *
   * @public
   * @readonly
   * @instance
   * @member {Nilable<string>?} description
   */
  public readonly description?: Nilable<string>

  /**
   * Node ID of label to update.
   *
   * @public
   * @readonly
   * @instance
   * @member {string} id
   */
  public readonly id: string

  /**
   * New label name.
   *
   * @public
   * @readonly
   * @instance
   * @member {Nilable<string>?} name
   */
  public readonly name?: Nilable<string>

  /**
   * Create a new label update command.
   *
   * @param {UpdateLabelCommand} params - Command parameters
   */
  constructor(params: UpdateLabelCommand) {
    this.color = params.color?.replace(/^#/, '')
    this.description = params.description
    this.id = params.id
    this.name = params.name
  }
}

export default UpdateLabelCommand
