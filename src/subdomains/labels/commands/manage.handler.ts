/**
 * @file Commands - ManageLabelsHandler
 * @module repostructure/labels/commands/ManageLabelsHandler
 */

import { ManageListHandler } from '#src/commands'
import type { Config } from '#src/config'
import { LabelsQuery } from '#src/labels/queries'
import type { Label } from '#src/labels/types'
import { ConfigService } from '@nestjs/config'
import { CommandBus, CommandHandler, QueryBus } from '@nestjs/cqrs'
import CreateLabelCommand from './create.command'
import DeleteLabelCommand from './delete.command'
import ManageLabelsCommand from './manage.command'
import UpdateLabelCommand from './update.command'

/**
 * Label management command handler.
 *
 * @see {@linkcode Label}
 * @see {@linkcode ManageLabelsCommand}
 * @see {@linkcode ManageListHandler}
 *
 * @class
 * @extends {ManageListHandler<ManageLabelsCommand, Label>}
 */
@CommandHandler(ManageLabelsCommand)
class ManageLabelsHandler
  extends ManageListHandler<ManageLabelsCommand, Label> {
  /**
   * Create a new label management command handler.
   *
   * @see {@linkcode CommandBus}
   * @see {@linkcode ConfigService}
   * @see {@linkcode Config}
   * @see {@linkcode QueryBus}
   *
   * @param {ConfigService<Config, true>} config - Infrastructure config service
   * @param {CommandBus} commands - Command bus
   * @param {QueryBus} queries - Query bus
   */
  constructor(
    protected readonly config: ConfigService<Config, true>,
    protected readonly commands: CommandBus,
    protected readonly queries: QueryBus
  ) {
    super()
  }

  /**
   * Execute a label management command.
   *
   * @see {@linkcode Label}
   * @see {@linkcode ManageLabelsCommand}
   *
   * @public
   * @async
   *
   * @param {ManageLabelsCommand} command - Command to execute
   * @return {Promise<Label[]>} Managed repository labels
   */
  public async execute(command: ManageLabelsCommand): Promise<Label[]> {
    return this.manage(
      'name',
      command.labels,
      LabelsQuery,
      DeleteLabelCommand,
      CreateLabelCommand,
      UpdateLabelCommand
    )
  }
}

export default ManageLabelsHandler
