/**
 * @file Type Tests - BranchActors
 * @module branches/types/tests/unit-d/BranchActors
 */

import type { App } from '#src/apps/types'
import type { Team } from '#src/teams/types'
import type { User } from '#src/users/types'
import type { Nilable } from '@flex-development/tutils'
import type TestSubject from '../branch-actors'

describe('unit-d:branches/types/BranchActors', () => {
  it('should match [apps?: Nullable<App["slug"][]>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('apps')
      .toEqualTypeOf<Nilable<App['slug'][]>>()
  })

  it('should match [teams?: Nullable<Team["slug"][]>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('teams')
      .toEqualTypeOf<Nilable<Team['slug'][]>>()
  })

  it('should match [users?: Nullable<User["login"][]>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('users')
      .toEqualTypeOf<Nilable<User['login'][]>>()
  })
})
