/**
 * @file Type Definitions - Label
 * @module repostructure/labels/types/Label
 */

import type { Nullable } from '@flex-development/tutils'

/**
 * Repository label object.
 *
 * @see https://docs.github.com/graphql/reference/objects#label
 */
type Label = {
  /**
   * Label color.
   */
  readonly color: string

  /**
   * Label description.
   */
  readonly description: Nullable<string>

  /**
   * Node ID of label.
   */
  readonly id: string

  /**
   * Label name.
   */
  readonly name: string
}

export type { Label as default }
