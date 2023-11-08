/**
 * @file Type Tests - Config
 * @module repostructure/config/interfaces/tests/unit-d/Config
 */

import type { Omit } from '@flex-development/tutils'
import type TestSubject from '../config.interface'
import type Inputs from '../inputs.interface'

describe('unit-d:config/interfaces/Config', () => {
  it('should extend Omit<Inputs, "config">', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<Omit<Inputs, 'config'>>()
  })

  it('should match [id: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('id').toEqualTypeOf<string>()
  })

  it('should match [owner: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('owner').toEqualTypeOf<string>()
  })

  it('should match [repo: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('repo').toEqualTypeOf<string>()
  })
})
