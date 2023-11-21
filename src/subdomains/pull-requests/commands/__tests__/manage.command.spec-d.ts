/**
 * @file Type Tests - ManagePullRequestsCommand
 * @module pull-requests/commands/tests/unit-d/ManagePullRequestsCommand
 */

import type {
  MergeMessage,
  MergeTitle,
  SquashMessage,
  SquashTitle
} from '#src/pull-requests/enums'
import type { Nilable, ReadonlyKeys } from '@flex-development/tutils'
import type TestSubject from '../manage.command'

describe('unit-d:pull-requests/commands/ManagePullRequestsCommand', () => {
  it('should have all readonly keys', () => {
    expectTypeOf<keyof TestSubject>().toEqualTypeOf<ReadonlyKeys<TestSubject>>()
  })

  it('should match [auto_merge?: Nilable<boolean>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('auto_merge')
      .toEqualTypeOf<Nilable<boolean>>()
  })

  it('should match [delete_branch_on_merge?: Nilable<boolean>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('delete_branch_on_merge')
      .toEqualTypeOf<Nilable<boolean>>()
  })

  it('should match [merge?: Nilable<boolean>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('merge')
      .toEqualTypeOf<Nilable<boolean>>()
  })

  it('should match [merge_message?: Nilable<MergeMessage>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('merge_message')
      .toEqualTypeOf<Nilable<MergeMessage>>()
  })

  it('should match [merge_title?: Nilable<MergeTitle>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('merge_title')
      .toEqualTypeOf<Nilable<MergeTitle>>()
  })

  it('should match [rebase?: Nilable<boolean>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('rebase')
      .toEqualTypeOf<Nilable<boolean>>()
  })

  it('should match [squash?: Nilable<boolean>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('squash')
      .toEqualTypeOf<Nilable<boolean>>()
  })

  it('should match [squash_message?: Nilable<SquashMessage>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('squash_message')
      .toEqualTypeOf<Nilable<SquashMessage>>()
  })

  it('should match [squash_title?: Nilable<SquashTitle>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('squash_title')
      .toEqualTypeOf<Nilable<SquashTitle>>()
  })

  it('should match [update_branch?: Nilable<boolean>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('update_branch')
      .toEqualTypeOf<Nilable<boolean>>()
  })
})
