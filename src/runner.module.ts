/**
 * @file RunnerModule
 * @module repostructure/RunnerModule
 */

import { Global, Module, type OnApplicationBootstrap } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { CommandBus, CqrsModule } from '@nestjs/cqrs'
import { AppsModule } from './subdomains/apps'
import {
  BranchesModule,
  ManageBranchProtectionsCommand
} from './subdomains/branches'
import { ConfigModule, type Config } from './subdomains/config'
import {
  EnvironmentsModule,
  ManageEnvironmentsCommand
} from './subdomains/environments'
import { LabelsModule, ManageLabelsCommand } from './subdomains/labels'
import { OctokitModule } from './subdomains/octokit'
import { TeamsModule } from './subdomains/teams'
import { UsersModule } from './subdomains/users'
import type { Infrastructure, InfrastructureCommand } from './types'

/**
 * Action runner module.
 *
 * @class
 * @implements {OnApplicationBootstrap}
 */
@Global()
@Module({
  imports: [
    AppsModule,
    BranchesModule,
    ConfigModule.forRoot(),
    CqrsModule.forRoot(),
    EnvironmentsModule,
    LabelsModule,
    OctokitModule,
    TeamsModule,
    UsersModule
  ]
})
class RunnerModule implements OnApplicationBootstrap {
  /**
   * Create a new action runner module.
   *
   * @see {@linkcode CommandBus}
   * @see {@linkcode ConfigService}
   * @see {@linkcode Config}
   *
   * @param {ConfigService<Config, true>} config - Infrastructure config service
   * @param {CommandBus} commands - Command bus
   */
  constructor(
    protected readonly config: ConfigService<Config, true>,
    protected readonly commands: CommandBus
  ) {}

  /**
   * Manage repository infrastructure.
   *
   * @public
   * @async
   *
   * @return {Promise<void>} Nothing when complete
   */
  public async onApplicationBootstrap(): Promise<void> {
    /**
     * Repository infrastructure object.
     *
     * @const {Infrastructure} infrastructure
     */
    const infrastructure: Infrastructure = this.config.get('infrastructure')

    /**
     * Infrastructure management commands to execute.
     *
     * @const {InfrastructureCommand[]} commands
     */
    const commands: InfrastructureCommand[] = [
      new ManageEnvironmentsCommand(infrastructure.environments),
      new ManageLabelsCommand(infrastructure.labels),
      new ManageBranchProtectionsCommand(infrastructure.branches)
    ]

    // execute management commands
    for (const command of commands) await this.commands.execute(command)

    return void infrastructure
  }
}

export default RunnerModule
