/**
 * @file Test Types - OctokitParameters
 * @module tests/types/OctokitParameters
 */

import type { Get } from '@flex-development/tutils'
import type { paths } from '@octokit/openapi-types'

/**
 * GitHub REST API parameters helper.
 *
 * @template R - REST API endpoint
 */
type OctokitParameters<
  M extends keyof paths[R],
  R extends keyof paths
> = Get<paths[R][M], 'parameters.path', never>

export type { OctokitParameters as default }
