/**
 * @file Type Definitions - Options
 * @module rice-action/types/Options
 */

import type { ObjectPlain, Simplify } from '@flex-development/tutils'
import type StripRepo from './strip-repo'

/**
 * Converts the given GitHub REST API operation type to a user options object.
 *
 * The `parameters` value type will be extracted from the operation type. The
 * `owner` and `repo` properties will also be removed.
 *
 * @template T - REST API operation type
 */
type Options<T extends { parameters: ObjectPlain }> = Simplify<
  StripRepo<T['parameters']>
>

export type { Options as default }
