/**
 * @file Type Tests - Options
 * @module rice-action/types/tests/unit-d/Options
 */

import type { Endpoint } from '#src/enums'
import type { Endpoints } from '@octokit/types'
import type TestSubject from '../options'

describe('unit-d:types/Options', () => {
  type T = Endpoints[Endpoint.LABEL_UPDATE]

  it('should match type of Partial<T["parameters"]>', () => {
    expectTypeOf<TestSubject<T>>().toMatchTypeOf<Partial<T['parameters']>>()
  })

  it('should remove "owner" property', () => {
    expectTypeOf<TestSubject<T>>().not.toHaveProperty('owner')
  })

  it('should remove "repo" property', () => {
    expectTypeOf<TestSubject<T>>().not.toHaveProperty('repo')
  })
})
