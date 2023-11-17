/**
 * @file RunnerModule
 * @module repostructure/RunnerModule
 */

import type { ObjectCurly } from '@flex-development/tutils'
import { Global, Module, type OnApplicationBootstrap } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { CommandBus, CqrsModule } from '@nestjs/cqrs'
import { ConfigModule, type Config } from './subdomains/config'
import { LabelsModule, ManageLabelsCommand } from './subdomains/labels'
import { OctokitModule } from './subdomains/octokit'
import { UsersModule } from './subdomains/users'
import type { Infrastructure } from './types'

/**
 * Action runner module.
 *
 * @class
 * @implements {OnApplicationBootstrap}
 */
@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    CqrsModule.forRoot(),
    LabelsModule,
    OctokitModule,
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
     * Management commands to execute.
     *
     * @const {Record<keyof Infrastructure, ObjectCurly[]>[]} managers
     */
    const managers: Record<keyof Infrastructure, ObjectCurly[]>[] = [
      new ManageLabelsCommand(infrastructure.labels)
    ]

    // execute management commands
    for (const manager of managers) await this.commands.execute(manager)

    return void infrastructure
  }
}

export default RunnerModule
