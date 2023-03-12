/**
 * @file Interfaces - Repository
 * @module rice-action/interfaces/Repository
 */

import type { Endpoint } from '#src/enums'
import type { Options } from '#src/types'
import type { Endpoints } from '@octokit/types'

/**
 * Object representing repository settings.
 *
 * @see {@linkcode Endpoint.REPOSITORY}
 *
 * @extends {Options<Endpoints[Endpoint.REPOSITORY]>}
 */
interface Repository extends Options<Endpoints[Endpoint.REPOSITORY]> {
  [key: string]:
    | Options<Endpoints[Endpoint.REPOSITORY]>[keyof Options<
        Endpoints[Endpoint.REPOSITORY]
      >]
    | string[]

  /**
   * Enable or disable automated security fixes.
   *
   * @see https://docs.github.com/rest/repos#enable-automated-security-fixes
   * @see https://docs.github.com/rest/repos#disable-automated-security-fixes
   *
   * @default false
   */
  automated_security_fixes?: boolean

  /**
   * Repository topics.
   *
   * @see https://docs.github.com/rest/repos/repos#replace-all-repository-topics
   *
   * @default []
   */
  topics?: string[]

  /**
   * Enable or disable dependency alerts and the dependency graph.
   *
   * @see https://docs.github.com/rest/repos/#disable-vulnerability-alerts
   * @see https://docs.github.com/rest/repos/#enable-vulnerability-alerts
   *
   * @default false
   */
  vulnerability_alerts?: boolean
}

export type { Repository as default }
