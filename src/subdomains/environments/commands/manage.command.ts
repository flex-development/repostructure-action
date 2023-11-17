/**
 * @file Commands - ManageEnvironmentsCommand
 * @module repostructure/environments/commands/ManageEnvironmentsCommand
 */

import { select } from '@flex-development/tutils'
import CreateEnvironmentCommand from './create.command'

/**
 * Environment management command.
 *
 * @class
 */
class ManageEnvironmentsCommand {
  /**
   * Environments parsed from infrastructure file.
   *
   * @see {@linkcode CreateEnvironmentCommand}
   *
   * @public
   * @readonly
   * @instance
   * @member {CreateEnvironmentCommand[]} environments
   */
  public readonly environments: CreateEnvironmentCommand[]

  /**
   * Create a new environment management command.
   *
   * @param {CreateEnvironmentCommand[]} environments - Environments to manage
   */
  constructor(environments: CreateEnvironmentCommand[]) {
    this.environments = select(environments, null, environment => {
      return new CreateEnvironmentCommand(environment)
    })
  }
}

export default ManageEnvironmentsCommand
