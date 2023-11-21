/**
 * @file Test Types - OctokitData
 * @module tests/types/OctokitData
 */

import type { EmptyObject, IfNever } from '@flex-development/tutils'
import type { Endpoints } from '@octokit/types'

/**
 * GitHub REST API response data helper.
 *
 * @template R - REST API endpoint
 */
type OctokitData<R extends keyof Endpoints> =
  Endpoints[R]['response']['data'] extends infer J // dprint-ignore-next
    ? | IfNever<J, EmptyObject, J>
      | Record<'documentation_url' | 'message', string>
    : never

export type { OctokitData as default }
