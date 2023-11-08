/**
 * @file Commands - DeleteLabelCommand
 * @module repostructure/labels/commands/DeleteLabelCommand
 */

/**
 * Label deletion command.
 *
 * @class
 */
class DeleteLabelCommand {
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
   * Create a new label deletion command.
   *
   * @param {DeleteLabelCommand} params - Command parameters
   */
  constructor(params: DeleteLabelCommand) {
    this.id = params.id
  }
}

export default DeleteLabelCommand
