/**
 * @file Type Definitions - Infrastructure
 * @module repostructure/types/Infrastructure
 */

import type { CreateEnvironmentCommand } from '#src/environments'
import type { CreateLabelCommand } from '#src/labels'

/**
 * Repository infrastructure object.
 */
type Infrastructure = {
  /**
   * Deployment environments.
   *
   * @see {@linkcode CreateEnvironmentCommand}
   */
  environments: CreateEnvironmentCommand[]

  /**
   * Repository labels.
   *
   * @see {@linkcode CreateLabelCommand}
   */
  labels: CreateLabelCommand[]
}

export type { Infrastructure as default }
