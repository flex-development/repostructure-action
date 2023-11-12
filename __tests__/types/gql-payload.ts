/**
 * @file Test Type Definitions - GQLPayload
 * @module tests/types/GQLPayload
 */

import type { Nullable } from '@flex-development/tutils'

/**
 * GraphQL payload object.
 *
 * @template K - Payload data name
 * @template T - Payload data type
 */
type GQLPayload<K extends string, T = any> = {
  /**
   * Payload data.
   */
  payload: Nullable<Record<K, T extends readonly any[] ? { nodes: T } : T>>
}

export type { GQLPayload as default }
