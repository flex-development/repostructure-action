/**
 * @file Type Definitions - StripRepo
 * @module rice-action/types/StripRepo
 */

import type { ObjectPlain } from '@flex-development/tutils'

/**
 * Removes the properties `owner` and `repo` from the given object type.
 *
 * @template T - Object type
 */
type StripRepo<T extends ObjectPlain> = Omit<T, 'owner' | 'repo'>

export type { StripRepo as default }
