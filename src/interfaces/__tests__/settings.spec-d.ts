/**
 * @file Type Tests - Settings
 * @module rice-action/interfaces/tests/unit-d/Settings
 */

import type Branch from '../branch'
import type Environment from '../environment'
import type Label from '../label'
import type Repository from '../repository'
import type TestSubject from '../settings'
import type Team from '../team'

describe('unit-d:interfaces/Settings', () => {
  it('should match [branches?: Branch[]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('branches')
      .toEqualTypeOf<Branch[] | undefined>()
  })

  it('should match [environments?: Environment[]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('environments')
      .toEqualTypeOf<Environment[] | undefined>()
  })

  it('should match [labels?: Label[]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('labels')
      .toEqualTypeOf<Label[] | undefined>()
  })

  it('should match [repository?: Repository]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('repository')
      .toEqualTypeOf<Repository | undefined>()
  })

  it('should match [teams?: Team[]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('teams')
      .toEqualTypeOf<Team[] | undefined>()
  })
})
