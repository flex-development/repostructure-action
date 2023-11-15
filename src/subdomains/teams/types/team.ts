/**
 * @file Type Definitions - Team
 * @module repostructure/teams/types/Team
 */

/**
 * Organization team object.
 */
type Team = {
  /**
   * Node ID of team.
   */
  readonly id: string

  /**
   * Team slug.
   */
  readonly slug: string
}

export type { Team as default }
