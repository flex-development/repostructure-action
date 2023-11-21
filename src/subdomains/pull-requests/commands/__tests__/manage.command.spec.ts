/**
 * @file Unit Tests - ManagePullRequestsCommand
 * @module pull-requests/commands/tests/unit/ManagePullRequestsCommand
 */

import {
  MergeMessage,
  MergeTitle,
  SquashMessage,
  SquashTitle
} from '#src/pull-requests/enums'
import TestSubject from '../manage.command'

describe('unit:pull-requests/commands/ManagePullRequestsCommand', () => {
  describe('constructor', () => {
    let auto_merge: boolean
    let delete_branch_on_merge: boolean
    let merge: boolean
    let merge_message: MergeMessage
    let merge_title: MergeTitle
    let rebase: boolean
    let squash: boolean
    let squash_message: SquashMessage
    let squash_title: SquashTitle
    let subject: TestSubject
    let update_branch: boolean

    beforeAll(() => {
      subject = new TestSubject({
        auto_merge: auto_merge = true,
        delete_branch_on_merge: delete_branch_on_merge = true,
        merge: merge = false,
        merge_message: merge_message = MergeMessage.BLANK,
        merge_title: merge_title = MergeTitle.PR_TITLE,
        rebase: rebase = true,
        squash: squash = true,
        squash_message: squash_message = SquashMessage.BLANK,
        squash_title: squash_title = SquashTitle.PR_TITLE,
        update_branch: update_branch = true
      })
    })

    it('should set #auto_merge', () => {
      expect(subject).to.have.property('auto_merge', auto_merge)
    })

    it('should set #delete_branch_on_merge', () => {
      expect(subject)
        .to.have.property('delete_branch_on_merge', delete_branch_on_merge)
    })

    it('should set #merge', () => {
      expect(subject).to.have.property('merge', merge)
    })

    it('should set #merge_message', () => {
      expect(subject).to.have.property('merge_message', merge_message)
    })

    it('should set #merge_title', () => {
      expect(subject).to.have.property('merge_title', merge_title)
    })

    it('should set #rebase', () => {
      expect(subject).to.have.property('rebase', rebase)
    })

    it('should set #squash', () => {
      expect(subject).to.have.property('squash', squash)
    })

    it('should set #squash_message', () => {
      expect(subject).to.have.property('squash_message', squash_message)
    })

    it('should set #squash_title', () => {
      expect(subject).to.have.property('squash_title', squash_title)
    })

    it('should set #update_branch', () => {
      expect(subject).to.have.property('update_branch', update_branch)
    })
  })
})
