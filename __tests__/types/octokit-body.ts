/**
 * @file Test Types - OctokitBody
 * @module tests/types/OctokitBody
 */

import type { Get } from '@flex-development/tutils'
import type { paths } from '@octokit/openapi-types'

/**
 * GitHub REST API body helper.
 *
 * @template M - REST API method
 * @template R - REST API endpoint
 */
type OctokitBody<
  M extends keyof paths[R],
  R extends keyof paths
> = Get<paths[R][M], 'requestBody.content.application/json', never>

export type { OctokitBody as default }
