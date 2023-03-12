/**
 * @file Interfaces - Environment
 * @module rice-action/interfaces/Environment
 */

import type { Endpoint } from '#src/enums'
import type { Options } from '#src/types'
import type { Endpoints } from '@octokit/types'

/**
 * Object representing a deployment environment configuration.
 *
 * @see {@linkcode Endpoint.ENVIRONMENT_UPSERT}
 *
 * @extends {Options<Endpoints[Endpoint.ENVIRONMENT_UPSERT]>}
 */
interface Environment extends Options<Endpoints[Endpoint.ENVIRONMENT_UPSERT]> {
  [key: string]: Options<Endpoints[Endpoint.ENVIRONMENT_UPSERT]>[keyof Options<
    Endpoints[Endpoint.ENVIRONMENT_UPSERT]
  >]
}

export type { Environment as default }
