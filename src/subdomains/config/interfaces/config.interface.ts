/**
 * @file Interfaces - Config
 * @module repostructure/config/interfaces/Config
 */

import type { Infrastructure } from '#src/types'
import type { Omit } from '@flex-development/tutils'
import type Inputs from './inputs.interface'

/**
 * Configuration object.
 *
 * @see {@linkcode Inputs}
 *
 * @extends {Omit<Inputs,'config'|'workspace'>}
 */
interface Config extends Omit<Inputs, 'config' | 'workspace'> {
  /**
   * GraphQL mutation id.
   */
  id: string

  /**
   * Repository infrastructure.
   *
   * @see {@linkcode Infrastructure}
   */
  infrastructure: Infrastructure

  /**
   * Node ID of repository.
   */
  node_id: string

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
