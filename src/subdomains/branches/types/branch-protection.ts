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
   * Branch pattern.
   */
  readonly pattern: string
}

export type { BranchProtection as default }
