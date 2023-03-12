/**
 * @file Interfaces - Settings
 * @module rice-action/interfaces/Settings
 */

import type Branch from './branch'
import type Environment from './environment'
import type Label from './label'
import type Repository from './repository'
import type Team from './team'

/**
 * Object representing repository infrastructure settings.
 */
interface Settings {
  [key: string]: Branch[] | Environment[] | Label[] | Repository | Team[]

  /**
   * Branch configurations.
   *
   * @see {@linkcode Branch}
   *
   * @default []
   */
  branches?: Branch[]

  /**
   * Deployment environment configurations.
   *
   * @see {@linkcode Environment}
   */
  environments?: Environment[]

  /**
   * Repository labels.
   *
   * @see {@linkcode Label}
   *
   * @default []
   */
  labels?: Label[]

  /**
   * Repository settings.
   *
   * @see {@linkcode Repository}
   *
   * @default {}
   */
  repository?: Repository

  /**
   * Team repository permissions.
   *
   * @see {@linkcode Team}
   *
   * @default []
   */
  teams?: Team[]
}

export type { Settings as default }
