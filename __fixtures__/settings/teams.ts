/**
 * @file Test Fixtures - teams
 * @module fixtures/settings/teams
 */

import { Permission } from '#src/enums'
import type { Team } from '#src/interfaces'

export default [
  {
    permission: Permission.TRIAGE,
    team_slug: 'dependabot-review'
  }
] as Team[]
