/**
 * @file Test Type Definitions - MutationVariables
 * @module tests/types/MutationVariables
 */

import type { ObjectCurly, ObjectPlain } from '@flex-development/tutils'

/**
 * GraphQL mutation variables.
 *
 * @template Input - Mutation input type
 */
type MutationVariables<Input extends ObjectCurly = ObjectPlain> = {
  /**
   * Mutation input.
   */
  input: Input
}

export type { MutationVariables as default }
