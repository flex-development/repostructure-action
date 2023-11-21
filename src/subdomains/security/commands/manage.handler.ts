/**
 * @file Commands - ManageSecurityHandler
 * @module repostructure/security/commands/ManageSecurityHandler
 */

import type { Config } from '#src/config'
import { Octokit } from '#src/octokit'
import {
  entries,
  ifelse,
  isBoolean,
  isNIL,
  shake,
  type NIL
} from '@flex-development/tutils'
import { ConfigService } from '@nestjs/config'
import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs'
import type {
  RestEndpointMethods
} from '@octokit/plugin-rest-endpoint-methods/dist-types/generated/method-types'
import ManageSecurityCommand from './manage.command'

/**
 * Security management command handler.
 *
 * @see {@linkcode ManageSecurityCommand}
 *
 * @class
 * @extends {ICommandHandler<ManageSecurityCommand,void>}
 */
@CommandHandler(ManageSecurityCommand)
class ManageSecurityHandler
  implements ICommandHandler<ManageSecurityCommand, void> {
  /**
   * Create a new security management command handler.
   *
   * @see {@linkcode ConfigService}
   * @see {@linkcode Config}
   * @see {@linkcode Octokit}
   *
   * @param {Octokit} octokit - Hydrated octokit client
   * @param {ConfigService<Config, true>} config - Infrastructure config service
   */
  constructor(
    protected readonly octokit: Octokit,
    protected readonly config: ConfigService<Config, true>
  ) {}

  /**
   * Execute a security management command.
   *
   * @see {@linkcode ManageSecurityCommand}
   *
   * @public
   * @async
   *
   * @param {ManageSecurityCommand} command - Command to execute
   * @return {Promise<void>} Nothing when complete
   */
  public async execute(command: ManageSecurityCommand): Promise<void> {
    const {
      advanced_security,
      secret_scanning,
      secret_scanning_push_protection,
      ...rest
    } = shake<ManageSecurityCommand, NIL>(command, isNIL)

    /**
     * Repository owner.
     *
     * @const {string} owner
     */
    const owner: string = this.config.get<string>('owner')

    /**
     * Repository name.
     *
     * @const {string} repo
     */
    const repo: string = this.config.get<string>('repo')

    // manage security and analysis
    await this.octokit.rest.repos.update({
      owner,
      repo,
      security_and_analysis: shake({
        advanced_security: shake({
          status: ifelse(
            isBoolean(advanced_security),
            ifelse(advanced_security, 'enabled', 'disabled'),
            undefined
          )
        }),
        secret_scanning: shake({
          status: ifelse(
            isBoolean(secret_scanning),
            ifelse(secret_scanning, 'enabled', 'disabled'),
            undefined
          )
        }),
        secret_scanning_push_protection: shake({
          status: ifelse(
            isBoolean(secret_scanning_push_protection),
            ifelse(secret_scanning_push_protection, 'enabled', 'disabled'),
            undefined
          )
        })
      }, obj => !entries(obj).length)
    })

    // manage automated security fixes + vulnerability alerts and reporting
    for (const [option, value] of entries(rest)) {
      if (isBoolean(value)) {
        /**
         * Security method prefix.
         *
         * @const {'disable' | 'enable'} action
         */
        const action: 'disable' | 'enable' = ifelse(value, 'enable', 'disable')

        /**
         * Security method to execute.
         *
         * @const {keyof RestEndpointMethods['repos']} method
         */
        const method: keyof RestEndpointMethods['repos'] = `${action}${
          option === 'automated_security_fixes'
            ? 'AutomatedSecurityFixes'
            : option === 'vulnerability_alerts'
            ? 'VulnerabilityAlerts'
            : 'PrivateVulnerabilityReporting'
        }`

        // execute security method
        await this.octokit.rest.repos[method]({ owner, repo })
      }
    }

    return void command
  }
}

export default ManageSecurityHandler
