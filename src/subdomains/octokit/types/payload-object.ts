/**
 * @file Type Definitions - PayloadObject
 * @module repostructure/octokit/types/PayloadObject
 */

import type { ObjectCurly, ObjectPlain } from '@flex-development/tutils'

/**
 * GraphQL payload object.
 *
 * @template K - Payload data name
 * @template T - Payload data type
 */
type PayloadObject<T extends ObjectCurly = ObjectPlain> = {
  /**
   * Payload data.
   */
  payload: T
}

export type { PayloadObject as default }
