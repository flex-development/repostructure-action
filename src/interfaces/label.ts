/**
 * @file Interfaces - Label
 * @module rice-action/interfaces/Label
 */

/**
 * Object representing a label.
 *
 * @see https://docs.github.com/issues/labels#create-a-label
 */
interface Label {
  [key: string]: string

  /**
   * [Hexadecimal color code][1] for the label, without the leading `#`.
   *
   * [1]: http://www.color-hex.com/
   */
  color?: string

  /**
   * Short description of the label.
   *
   * @maximum 100
   */
  description?: string

  /**
   * Name of the label.
   *
   * Emoji can be added to label names, using either native emoji or colon-style
   * markup (e.g. typing `:strawberry:` will render the emoji 🍓).
   *
   * @see https://github.com/ikatyang/emoji-cheat-sheet
   */
  name: string
}

export type { Label as default }
