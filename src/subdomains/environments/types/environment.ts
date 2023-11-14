/**
 * @file Type Definitions - Environment
 * @module repostructure/environments/types/Environment
 */

/**
 * Environment object.
 *
 * @see https://docs.github.com/graphql/reference/objects#environment
 */
type Environment = {
  /**
   * Node ID of environment.
   */
  readonly id: string

  /**
   * Environment name.
   */
  readonly name: string
}

export type { Environment as default }
