/**
 * @file Commands - ManageLabelsCommand
 * @module repostructure/labels/commands/ManageLabelsCommand
 */

import { select } from '@flex-development/tutils'
import CreateLabelCommand from './create.command'

/**
 * Label management command.
 *
 * @class
 */
class ManageLabelsCommand {
  /**
   * Labels parsed from infrastructure file.
   *
   * @see {@linkcode CreateLabelCommand}
   *
   * @public
   * @readonly
   * @instance
   * @member {CreateLabelCommand[]} labels
   */
  public readonly labels: CreateLabelCommand[]

  /**
   * Create a new label management command.
   *
   * @param {CreateLabelCommand[]} labels - Labels to manage
   */
  constructor(labels: CreateLabelCommand[]) {
    this.labels = select(labels, null, label => new CreateLabelCommand(label))
  }
}

export default ManageLabelsCommand
