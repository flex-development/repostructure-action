/**
 * @file Test Types - OctokitBody
 * @module tests/types/OctokitBody
 */

import type { Get, OrUppercase, Stringify } from '@flex-development/tutils'
import type { paths } from '@octokit/openapi-types'

/**
 * GitHub REST API body helper.
 *
 * @template R - REST API endpoint
 * @template M - REST API method
 */
type OctokitBody<
  M extends OrUppercase<Stringify<keyof paths[R]>>,
  R extends keyof paths
> = Get<
  Get<paths[R], Lowercase<Stringify<M>>>,
  'requestBody.content.application/json',
  never
>

export type { OctokitBody as default }
