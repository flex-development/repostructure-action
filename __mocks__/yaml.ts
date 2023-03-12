/**
 * @file Mocks - yaml
 * @module mocks/yaml
 * @see https://github.com/eemeli/yaml
 */

/**
 * [`yaml`][1] module type.
 *
 * [1]: https://github.com/eemeli/yaml
 */
type Actual = typeof import('yaml')

/**
 * `yaml` module.
 *
 * @const {Actual} actual
 */
const actual: Actual = await vi.importActual<Actual>('yaml')

export const parse = vi.fn(actual.parse).mockName('parse')
