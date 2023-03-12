/**
 * @file Interfaces - LabelResponse
 * @module rice-action/interfaces/LabelResponse
 */

import type { Nullable } from '@flex-development/tutils'

/**
 * Object representing a label from the GitHub API.
 *
 * @see https://docs.github.com/rest/issues/labels#list-labels-for-a-repository
 */
interface LabelResponse {
  /**
   * [Hexadecimal color code][1] for the label, without the leading `#`.
   *
   * [1]: http://www.color-hex.com/
   */
  color: string

  /**
   * Boolean indicating if label is a default label.
   *
   * @default false
   */
  default: boolean

  /**
   * Short description of the label.
   *
   * @maximum 100
   */
  description: Nullable<string>

  /**
   * Label id.
   */
  id: number

  /**
   * Name of the label.
   *
   * Emoji can be added to label names, using either native emoji or colon-style
   * markup (e.g. typing `:strawberry:` will render the emoji 🍓).
   *
   * @see https://github.com/ikatyang/emoji-cheat-sheet
   */
  name: string

  /**
   * Label node id.
   */
  node_id: string

  /**
   * Label URL.
   */
  url: string
}

export type { LabelResponse as default }
