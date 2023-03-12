/**
 * @file Type Definitions - Response
 * @module rice-action/types/Response
 */

import type { Endpoints } from '@octokit/types'

/**
 * GitHub API response type.
 *
 * @template Route - API endpoint
 */
type Response<Route extends string> = Route extends keyof Endpoints
  ? Endpoints[Route]['response']
  : never

export type { Response as default }
