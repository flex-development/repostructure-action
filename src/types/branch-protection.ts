/**
 * @file Type Definitions - BranchProtection
 * @module rice-action/types/BranchProtection
 */

import type { Endpoint } from '#src/enums'
import type { Endpoints } from '@octokit/types'
import type Options from './options'

/**
 * Branch protection options.
 *
 * @see {@linkcode Endpoint.BRANCH_PROTECTION}
 */
type BranchProtection = Options<Endpoints[Endpoint.BRANCH_PROTECTION]>

export type { BranchProtection as default }
