/**
 * @file Type Definitions - Branch
 * @module repostructure/branches/types/Branch
 */

/**
 * Protected branch object.
 *
 * @see https://docs.github.com/graphql/reference/objects#branchprotectionrule
 */
type Branch = {
  /**
   * Node ID of branch protection rule.
   */
  readonly id: string

  /**
   * Protection rule pattern.
   */
  readonly pattern: string
}

export type { Branch as default }
