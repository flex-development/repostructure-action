/**
 * @file Type Definitions - BranchProtection
 * @module repostructure/branches/types/BranchProtection
 */

/**
 * Branch protection rule object.
 *
 * @see https://docs.github.com/graphql/reference/objects#branchprotectionrule
 */
type BranchProtection = {
  /**
   * Node ID of branch protection rule.
   */
  readonly id: string

  /**
   * Glob-like pattern used to determine protected branches.
   */
  readonly pattern: string
}

export type { BranchProtection as default }
