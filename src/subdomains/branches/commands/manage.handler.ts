/**
 * @file Commands - ManageBranchProtectionsHandler
 * @module repostructure/branches/commands/ManageBranchProtectionsHandler
 */

import { BranchProtectionsQuery } from '#src/branches/queries'
import type { BranchProtection } from '#src/branches/types'
import { ManageListHandler } from '#src/commands'
import type { Config } from '#src/config'
import { ConfigService } from '@nestjs/config'
import { CommandBus, CommandHandler, QueryBus } from '@nestjs/cqrs'
import CreateBranchProtectionCommand from './create.command'
import DeleteBranchProtectionCommand from './delete.command'
import ManageBranchProtectionsCommand from './manage.command'
import UpdateBranchProtectionCommand from './update.command'

/**
 * Branch protection rules management command handler.
 *
 * @see {@linkcode BranchProtection}
 * @see {@linkcode ManageBranchProtectionsCommand}
 * @see {@linkcode ManageListHandler}
 *
 * @class
 * @extends {ManageListHandler<ManageBranchProtectionsCommand,BranchProtection>}
 */
@CommandHandler(ManageBranchProtectionsCommand)
class ManageBranchProtectionsHandler
  extends ManageListHandler<ManageBranchProtectionsCommand, BranchProtection> {
  /**
   * Create a new branch protection rules management command handler.
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
   * Execute a branch protection rules management command.
   *
   * @see {@linkcode BranchProtection}
   * @see {@linkcode ManageBranchProtectionsCommand}
   *
   * @public
   * @async
   *
   * @param {ManageBranchProtectionsCommand} command - Command to execute
   * @return {Promise<BranchProtection[]>} Managed environments
   */
  public async execute(
    command: ManageBranchProtectionsCommand
  ): Promise<BranchProtection[]> {
    return this.manage(
      ['pattern', 'branch'],
      command.branches,
      BranchProtectionsQuery,
      DeleteBranchProtectionCommand,
      CreateBranchProtectionCommand,
      UpdateBranchProtectionCommand
    )
  }
}

export default ManageBranchProtectionsHandler
