/**
 * @file Commands - ManageEnvironmentsHandler
 * @module repostructure/environments/commands/ManageEnvironmentsHandler
 */

import { ManageListHandler } from '#src/commands'
import type { Config } from '#src/config'
import { EnvironmentsQuery } from '#src/environments/queries'
import type { Environment } from '#src/environments/types'
import { ConfigService } from '@nestjs/config'
import { CommandBus, CommandHandler, QueryBus } from '@nestjs/cqrs'
import CreateEnvironmentCommand from './create.command'
import DeleteEnvironmentCommand from './delete.command'
import ManageEnvironmentsCommand from './manage.command'
import UpdateEnvironmentCommand from './update.command'

/**
 * Environment management command handler.
 *
 * @see {@linkcode Environment}
 * @see {@linkcode ManageEnvironmentsCommand}
 * @see {@linkcode ManageListHandler}
 *
 * @class
 * @extends {ManageListHandler<Environment>}
 */
@CommandHandler(ManageEnvironmentsCommand)
class ManageEnvironmentsHandler
  extends ManageListHandler<ManageEnvironmentsCommand, Environment> {
  /**
   * Create a new environment management command handler.
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
   * Execute an environment management command.
   *
   * @see {@linkcode Environment}
   * @see {@linkcode ManageEnvironmentsCommand}
   *
   * @public
   * @async
   *
   * @param {ManageEnvironmentsCommand} command - Command to execute
   * @return {Promise<Environment[]>} Managed environments
   */
  public async execute(
    command: ManageEnvironmentsCommand
  ): Promise<Environment[]> {
    return this.manage(
      'name',
      command.environments,
      EnvironmentsQuery,
      DeleteEnvironmentCommand,
      CreateEnvironmentCommand,
      UpdateEnvironmentCommand
    )
  }
}

export default ManageEnvironmentsHandler
