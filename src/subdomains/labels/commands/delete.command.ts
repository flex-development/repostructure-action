/**
 * @file Commands - DeleteLabelCommand
 * @module repostructure/labels/commands/DeleteLabelCommand
 */

import type { Label } from '#src/labels/types'

/**
 * Label deletion command.
 *
 * @class
 */
class DeleteLabelCommand {
  /**
   * Node ID of label to delete.
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
   * Create a new label deletion command.
   *
   * @param {DeleteLabelCommand} params - Command parameters
   */
  constructor(params: DeleteLabelCommand) {
    this.id = params.id
  }
}

export default DeleteLabelCommand
