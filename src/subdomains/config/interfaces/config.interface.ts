/**
 * @file Interfaces - Config
 * @module repostructure/config/interfaces/Config
 */

import type { Omit } from '@flex-development/tutils'
import type Inputs from './inputs.interface'

/**
 * Infrastructure configuration object.
 *
 * @see {@linkcode Inputs}
 *
 * @extends {Omit<Inputs,'config'>}
 */
interface Config extends Omit<Inputs, 'config'> {
  /**
   * GraphQL mutation id.
   */
  id: string

  /**
   * Repository owner.
   */
  owner: string

  /**
   * Repository name.
   */
  repo: string
}

export type { Config as default }
