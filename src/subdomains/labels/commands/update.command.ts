/**
 * @file Commands - UpdateLabelCommand
 * @module repostructure/labels/commands/UpdateLabelCommand
 */

import { LabelDTO } from '#src/labels/dto'
import type { Label } from '#src/labels/types'
import type { Nullable } from '@flex-development/tutils'

/**
 * Label update command.
 *
 * @see https://docs.github.com/graphql/reference/input-objects#updatelabelinput
 *
 * @class
 * @extends {LabelDTO}
 */
class UpdateLabelCommand extends LabelDTO {
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
   * Node ID of label to update.
   *
   * @see {@linkcode Label.id}
   *
   * @public
   * @readonly
   * @instance
   * @member {Label['id']} id
   */
  public readonly id: Label['id']

  /**
   * Create a new label update command.
   *
   * @param {UpdateLabelCommand} params - Command parameters
   */
  constructor({ color = null, id, ...rest }: UpdateLabelCommand) {
    super(rest)
    this.color = color
    this.color && (this.color = this.color.replace(/^#/, ''))
    this.id = id
  }
}

export default UpdateLabelCommand
