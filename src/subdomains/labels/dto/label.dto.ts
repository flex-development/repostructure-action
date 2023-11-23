/**
 * @file Data Transfer Objects - LabelDTO
 * @module repostructure/labels/dto/LabelDTO
 */

import type { Nullable } from '@flex-development/tutils'

/**
 * Label data transfer object.
 *
 * @see https://docs.github.com/graphql/reference/input-objects#createlabelinput
 * @see https://docs.github.com/graphql/reference/input-objects#updatelabelinput
 *
 * @class
 */
class LabelDTO {
  /**
   * A brief description of the label, such as its purpose.
   *
   * @default null
   *
   * @public
   * @readonly
   * @instance
   * @member {Nullable<string>?} description
   */
  public readonly description?: Nullable<string>

  /**
   * Create a new label data transfer object.
   *
   * @param {LabelDTO} data - Label data
   */
  constructor({ description = null }: LabelDTO) {
    this.description = description
  }
}

export default LabelDTO
