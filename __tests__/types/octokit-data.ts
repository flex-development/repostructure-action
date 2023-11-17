/**
 * @file Test Types - OctokitData
 * @module tests/types/OctokitData
 */

import type { Endpoints } from '@octokit/types'

/**
 * GitHub REST API response data helper.
 *
 * @template R - REST API endpoint
 */
type OctokitData<R extends keyof Endpoints> =
  | Endpoints[R]['response']['data']
  | Record<'documentation_url' | 'message', string>

export type { OctokitData as default }
