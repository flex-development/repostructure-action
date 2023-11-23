/**
 * @file Type Definitions - Label
 * @module repostructure/labels/types/Label
 */

/**
 * Repository label object.
 *
 * @see https://docs.github.com/graphql/reference/objects#label
 */
type Label = {
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
