/**
 * @file Commands - CreateLabelCommand
 * @module repostructure/labels/commands/CreateLabelCommand
 */

import { LabelDTO } from '#src/labels/dto'
import type { Label } from '#src/labels/types'

/**
 * Label creation command.
 *
 * @see {@linkcode LabelDTO}
 *
 * @class
 * @extends {LabelDTO}
 */
class CreateLabelCommand extends LabelDTO {
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
   * Label name.
   *
   * @see {@linkcode Label.name}
   *
   * @public
   * @readonly
   * @instance
   * @member {Label['name']} name
   */
  public readonly name: Label['name']

  /**
   * Create a new label creation command.
   *
   * @param {CreateLabelCommand} params - Command parameters
   */
  constructor(params: CreateLabelCommand) {
    super(params)
    this.color = params.color.replace(/^#/, '')
    this.name = params.name
  }
}

export default CreateLabelCommand
