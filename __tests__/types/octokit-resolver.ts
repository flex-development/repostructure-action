/**
 * @file Test Types - OctokitResolver
 * @module tests/types/OctokitResolver
 */

import type { OneOrMany } from '@flex-development/tutils'
import type { paths } from '@octokit/openapi-types'
import type { ResponseResolver } from 'msw'
import type OctokitBody from './octokit-body'
import type OctokitData from './octokit-data'
import type OctokitMethod from './octokit-method'
import type OctokitParameters from './octokit-parameters'

/**
 * GitHub REST API request resolver.
 *
 * @template M - REST API method
 * @template R - REST API route
 */
type OctokitResolver<
  M extends OctokitMethod,
  R extends keyof paths
> = Lowercase<M> extends infer N extends keyof paths[R] // dprint-ignore
  ? ResponseResolver<
        {
          cookies: Record<string, OneOrMany<string>>
          params: OctokitParameters<N, R>
        },
        OctokitBody<N, R>,
        OctokitData<N, R>
      >
  : never

export type { OctokitResolver as default }
