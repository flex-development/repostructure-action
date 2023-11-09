/**
 * @file Type Definitions - Infrastructure
 * @module repostructure/types/Infrastructure
 */

import type { CreateLabelCommand } from '#src/labels'

/**
 * Repository infrastructure object.
 */
type Infrastructure = {
  /**
   * Repository labels.
   *
   * @see {@linkcode CreateLabelCommand}
   */
  labels: CreateLabelCommand[]
}

export type { Infrastructure as default }
