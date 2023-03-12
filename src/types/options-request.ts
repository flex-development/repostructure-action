/**
 * @file Type Definitions - RequestOptions
 * @module rice-action/types/RequestOptions
 */

import type { Endpoint } from '#src/enums'
import type { Endpoints, RequestParameters } from '@octokit/types'
import type Options from './options'

/**
 * GitHub API request options.
 *
 * @template Route - API endpoint
 */
type RequestOptions<Route extends Endpoint> = Omit<
  Options<Endpoints[Route]> & RequestParameters,
  'headers' | 'mediaType'
>

export type { RequestOptions as default }
