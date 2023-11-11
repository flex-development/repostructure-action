/**
 * @file Type Definitions - PayloadObject
 * @module repostructure/types/PayloadObject
 */

import type { ObjectCurly, ObjectPlain } from '@flex-development/tutils'

/**
 * Response payload object.
 *
 * @template P - Response payload
 */
type PayloadObject<T extends ObjectCurly = ObjectPlain> = {
  /**
   * Response payload.
   */
  payload: T
}

export type { PayloadObject as default }
