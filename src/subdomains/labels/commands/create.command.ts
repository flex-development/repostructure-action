/**
 * @file Commands - CreateLabelCommand
 * @module repostructure/labels/commands/CreateLabelCommand
 */

import type { Nilable } from '@flex-development/tutils'

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
   * @member {Nilable<string>?} description
   */
  public readonly description?: Nilable<string>

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
    this.color = params.color
    this.description = params.description
    this.name = params.name
  }
}

export default CreateLabelCommand
