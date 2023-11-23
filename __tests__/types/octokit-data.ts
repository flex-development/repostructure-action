/**
 * @file Test Types - OctokitData
 * @module tests/types/OctokitData
 */

import type { Get, Stringify } from '@flex-development/tutils'
import type { paths } from '@octokit/openapi-types'

/**
 * GitHub REST API response data helper.
 *
 * @template M - REST API method
 * @template R - REST API endpoint
 */
type OctokitData<
  M extends keyof paths[R],
  R extends keyof paths
> = 'responses' extends infer H extends keyof paths[R][M]
  ? Stringify<keyof paths[R][M][H]> extends infer K extends string
    ? Get<paths[R][M][H], `${K}.content.application/json`, null>
  : never
  : never

export type { OctokitData as default }
