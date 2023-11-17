/**
 * @file Test Types - OctokitParameters
 * @module tests/types/OctokitParameters
 */

import type { Endpoints } from '@octokit/types'

/**
 * GitHub REST API parameters helper.
 *
 * @template R - REST API endpoint
 */
type OctokitParameters<R extends keyof Endpoints> = Endpoints[R]['parameters']

export type { OctokitParameters as default }
