/**
 * @file Commands - UpdateLabelCommand
 * @module repostructure/labels/commands/UpdateLabelCommand
 */

import { get, type Nullable } from '@flex-development/tutils'

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
   * @default null
   *
   * @public
   * @readonly
   * @instance
   * @member {Nullable<string>?} color
   */
  public readonly color?: Nullable<string>

  /**
   * A brief description of the label, such as its purpose.
   *
   * @default null
   *
   * @public
   * @readonly
   * @instance
   * @member {Nullable<string>?} description
   */
  public readonly description?: Nullable<string>

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
   * @default null
   *
   * @public
   * @readonly
   * @instance
   * @member {Nullable<string>?} name
   */
  public readonly name?: Nullable<string>

  /**
   * Create a new label update command.
   *
   * @param {UpdateLabelCommand} params - Command parameters
   */
  constructor(params: UpdateLabelCommand) {
    this.color = get(params, 'color', null)
    this.description = get(params, 'description', null)
    this.id = params.id
    this.name = get(params, 'name', null)

    this.color && (this.color = this.color.replace(/^#/, ''))
  }
}

export default UpdateLabelCommand
