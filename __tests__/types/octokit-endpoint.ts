/**
 * @file Test Types - OctokitEndpoint
 * @module tests/types/OctokitEndpoint
 */

import type { Split, Trim } from '@flex-development/tutils'
import type { paths } from '@octokit/openapi-types'
import type { Endpoints } from '@octokit/types'
import type OctokitMethod from './octokit-method'

/**
 * Extract a GitHub REST API endpoint from {@linkcode paths} by HTTP method.
 *
 * @template M - GitHub REST API method
 */
type OctokitEndpoint<M extends OctokitMethod> =
  Extract<keyof Endpoints, `${M} ${string}`> extends infer J extends string
    ? Split<J, M> extends infer U extends [string, string]
      ? Trim<U[1]> extends infer P ? P extends keyof paths ? P : never
      : never
    : never
    : never

export type { OctokitEndpoint as default }
