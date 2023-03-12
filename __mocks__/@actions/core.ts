/**
 * @file Mocks - @actions/core
 * @module mocks/actions/core
 * @see https://github.com/actions/toolkit/tree/main/packages/core
 */

/**
 * [`@actions/core`][1] module type.
 *
 * [1]: https://github.com/actions/toolkit/tree/main/packages/core
 */
type Actual = typeof import('@actions/core')

/**
 * `@actions/core` module.
 *
 * @const {Actual} actual
 */
const actual: Actual = await vi.importActual<Actual>('@actions/core')

export const getInput = vi.fn(actual.getInput).mockName('getInput')
export const setFailed = vi.fn().mockName('setFailed')
