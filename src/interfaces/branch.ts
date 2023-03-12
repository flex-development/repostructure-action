/**
 * @file Interfaces - Branch
 * @module rice-action/interfaces/Branch
 */

import type { BranchProtection } from '#src/types'

/**
 * Branch configuration object.
 */
interface Branch {
  [key: string]: BranchProtection | string

  /**
   * Branch name.
   *
   * Cannot contain wildcard characters.
   */
  name: string

  /**
   * Branch protection settings.
   *
   * @see {@linkcode BranchProtection}
   */
  protection?: BranchProtection
}

export type { Branch as default }
