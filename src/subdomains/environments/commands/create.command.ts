/**
 * @file Commands - CreateEnvironmentCommand
 * @module repostructure/environments/commands/CreateEnvironmentCommand
 */

import { EnvironmentDTO } from '#src/environments/dto'
import type { Environment } from '#src/environments/types'

/**
 * Environment creation command.
 *
 * @see {@linkcode EnvironmentDTO}
 *
 * @class
 * @extends {EnvironmentDTO}
 */
class CreateEnvironmentCommand extends EnvironmentDTO {
  /**
   * Environment name.
   *
   * @see {@linkcode Environment.name}
   *
   * @public
   * @readonly
   * @instance
   * @member {Environment['name']} environment
   */
  public readonly environment: Environment['name']

  /**
   * Create a new environment creation command.
   *
   * @param {CreateEnvironmentCommand} params - Command parameters
   */
  constructor(params: CreateEnvironmentCommand) {
    super(params)
    this.environment = params.environment
  }
}

export default CreateEnvironmentCommand
