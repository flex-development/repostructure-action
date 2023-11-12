/**
 * @file Test Type Definitions - GQLError
 * @module tests/types/GQLError
 */

/**
 * Mock GraphQL error object.
 */
type GQLError = {
  /**
   * Error description.
   */
  message: string

  /**
   * Error path segments.
   */
  path: string[]

  /**
   * Error type.
   */
  type: string
}

export type { GQLError as default }
