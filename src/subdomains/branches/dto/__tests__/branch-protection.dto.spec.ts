/**
 * @file Unit Tests - BranchProtectionDTO
 * @module branches/dto/tests/unit/BranchProtectionDTO
 */

import type {
  BranchActors,
  DeploymentProtection,
  PullRequestProtection,
  StatusChecks
} from '#src/branches/types'
import TestSubject from '../branch-protection.dto'

describe('unit:branches/dto/BranchProtectionDTO', () => {
  describe('constructor', () => {
    let commit_signatures: boolean
    let conversation_resolution: boolean
    let creations_blocked: boolean
    let deletions: boolean
    let deployments: DeploymentProtection
    let enforce_admins: boolean
    let force_pushers: BranchActors
    let force_pushes: boolean
    let fork_syncing: boolean
    let linear_history: boolean
    let lock_branch: boolean
    let pull_requests: PullRequestProtection
    let restrictions: BranchActors
    let status_checks: StatusChecks
    let subject: TestSubject

    beforeAll(() => {
      subject = new TestSubject({
        commit_signatures: commit_signatures = true,
        conversation_resolution: conversation_resolution = true,
        creations_blocked: creations_blocked = false,
        deletions: deletions = false,
        deployments: deployments = { environments: [], strict: true },
        enforce_admins: enforce_admins = true,
        force_pushers: force_pushers = { apps: [], teams: [], users: [] },
        force_pushes: force_pushes = false,
        fork_syncing: fork_syncing = false,
        linear_history: linear_history = true,
        lock_branch: lock_branch = false,
        pull_requests: pull_requests = {
          approving_review_count: 1,
          bypass_restrictions: null,
          code_owner_reviews: false,
          dismiss_stale_reviews: true,
          dismissal_restrictions: null,
          last_push_approval: false
        },
        restrictions: restrictions = { apps: [], teams: [], users: [] },
        status_checks: status_checks = { checks: [], strict: true }
      })
    })

    it('should set #commit_signatures', () => {
      expect(subject).to.have.property('commit_signatures', commit_signatures)
    })

    it('should set #conversation_resolution', () => {
      expect(subject)
        .to.have.property('conversation_resolution', conversation_resolution)
    })

    it('should set #creations_blocked', () => {
      expect(subject).to.have.property('creations_blocked', creations_blocked)
    })

    it('should set #deletions', () => {
      expect(subject).to.have.property('deletions', deletions)
    })

    it('should set #deployments', () => {
      expect(subject).to.have.deep.property('deployments', deployments)
    })

    it('should set #enforce_admins', () => {
      expect(subject).to.have.property('enforce_admins', enforce_admins)
    })

    it('should set #force_pushers', () => {
      expect(subject).to.have.deep.property('force_pushers', force_pushers)
    })

    it('should set #force_pushes', () => {
      expect(subject).to.have.property('force_pushes', force_pushes)
    })

    it('should set #fork_syncing', () => {
      expect(subject).to.have.property('fork_syncing', fork_syncing)
    })

    it('should set #linear_history', () => {
      expect(subject).to.have.property('linear_history', linear_history)
    })

    it('should set #lock_branch', () => {
      expect(subject).to.have.property('lock_branch', lock_branch)
    })

    it('should set #pull_requests', () => {
      expect(subject).to.have.deep.property('pull_requests', pull_requests)
    })

    it('should set #restrictions', () => {
      expect(subject).to.have.deep.property('restrictions', restrictions)
    })

    it('should set #status_checks', () => {
      expect(subject).to.have.deep.property('status_checks', status_checks)
    })
  })
})
