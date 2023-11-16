/**
 * @file Commands - CreateLabelCommand
 * @module repostructure/labels/commands/CreateLabelCommand
 */

import { get, type Nullable } from '@flex-development/tutils'

/**
 * Label creation command.
 *
 * @see https://docs.github.com/graphql/reference/input-objects#createlabelinput
 *
 * @class
 */
class CreateLabelCommand {
  /**
   * A `6` character hex code, without the leading #, identifying the updated
   * color of the label.
   *
   * @public
   * @readonly
   * @instance
   * @member {string} color
   */
  public readonly color: string

  /**
   * A brief description of the label, such as its purpose.
   *
   * @public
   * @readonly
   * @instance
   * @member {Nullable<string>?} description
   */
  public readonly description?: Nullable<string>

  /**
   * Label name.
   *
   * @public
   * @readonly
   * @instance
   * @member {string} name
   */
  public readonly name: string

  /**
   * Create a new label creation command.
   *
   * @param {CreateLabelCommand} params - Command parameters
   */
  constructor(params: CreateLabelCommand) {
    this.color = params.color.replace(/^#/, '')
    this.description = get(params, 'description', null)
    this.name = params.name
  }
}

export default CreateLabelCommand
