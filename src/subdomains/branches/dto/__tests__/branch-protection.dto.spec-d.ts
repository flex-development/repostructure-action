/**
 * @file Type Tests - BranchProtectionDTO
 * @module branches/dto/tests/unit-d/BranchProtectionDTO
 */

import type {
  BranchActors,
  Deployments,
  PullRequests,
  StatusChecks
} from '#src/branches/types'
import type { Nilable, ReadonlyKeys } from '@flex-development/tutils'
import TestSubject from '../branch-protection.dto'

describe('unit-d:branches/dto/BranchProtectionDTO', () => {
  it('should have all readonly keys', () => {
    expectTypeOf<keyof TestSubject>().toEqualTypeOf<ReadonlyKeys<TestSubject>>()
  })

  it('should match [commit_signatures?: Nilable<boolean>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('commit_signatures')
      .toEqualTypeOf<Nilable<boolean>>()
  })

  it('should match [conversation_resolution?: Nilable<boolean>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('conversation_resolution')
      .toEqualTypeOf<Nilable<boolean>>()
  })

  it('should match [creations_blocked?: Nilable<boolean>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('creations_blocked')
      .toEqualTypeOf<Nilable<boolean>>()
  })

  it('should match [deletions?: Nilable<boolean>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('deletions')
      .toEqualTypeOf<Nilable<boolean>>()
  })

  it('should match [deployments?: Nilable<Deployments>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('deployments')
      .toEqualTypeOf<Nilable<Deployments>>()
  })

  it('should match [enforce_admins?: Nilable<boolean>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('enforce_admins')
      .toEqualTypeOf<Nilable<boolean>>()
  })

  it('should match [force_pushers?: Nilable<BranchActors>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('force_pushers')
      .toEqualTypeOf<Nilable<BranchActors>>()
  })

  it('should match [force_pushes?: Nilable<boolean>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('force_pushes')
      .toEqualTypeOf<Nilable<boolean>>()
  })

  it('should match [fork_syncing?: Nilable<boolean>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('fork_syncing')
      .toEqualTypeOf<Nilable<boolean>>()
  })

  it('should match [linear_history?: Nilable<boolean>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('linear_history')
      .toEqualTypeOf<Nilable<boolean>>()
  })

  it('should match [lock_branch?: Nilable<boolean>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('lock_branch')
      .toEqualTypeOf<Nilable<boolean>>()
  })

  it('should match [pull_requests?: Nilable<PullRequests>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('pull_requests')
      .toEqualTypeOf<Nilable<PullRequests>>()
  })

  it('should match [restrictions?: Nilable<BranchActors>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('restrictions')
      .toEqualTypeOf<Nilable<BranchActors>>()
  })

  it('should match [status_checks?: Nilable<StatusChecks>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('status_checks')
      .toEqualTypeOf<Nilable<StatusChecks>>()
  })
})
