/**
 * @file Interfaces - Team
 * @module rice-action/interfaces/Team
 */

import type { Endpoint, Permission } from '#src/enums'
import type { Options } from '#src/types'
import type { Endpoints } from '@octokit/types'

/**
 * Object representing team repository permissions.
 *
 * @see {@linkcode Endpoint.TEAM_REPO}
 *
 * @extends {Options<Endpoints[Endpoint.TEAM_REPO]>}
 */
interface Team extends Options<Endpoints[Endpoint.TEAM_REPO]> {
  [key: string]: Options<Endpoints[Endpoint.TEAM_REPO]>[keyof Options<
    Endpoints[Endpoint.TEAM_REPO]
  >]

  /**
   * Permission to grant.
   *
   * @see {@linkcode Permission}
   *
   * @default Permission.PUSH
   */
  permission?: Permission
}

export type { Team as default }
