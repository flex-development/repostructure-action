/**
 * @file Unit Tests - ManageBranchProtectionsCommand
 * @module branches/commands/tests/unit/ManageBranchProtectionsCommand
 */

import api from '#fixtures/api.github.json' assert { type: 'json' }
import { select } from '@flex-development/tutils'
import CreateBranchProtectionCommand from '../create.command'
import TestSubject from '../manage.command'

describe('unit:branches/commands/ManageBranchProtectionsCommand', () => {
  describe('constructor', () => {
    let subject: TestSubject

    beforeAll(() => {
      subject = new TestSubject(select(
        api.graphql.repository.branchProtectionRules.nodes,
        null,
        branch => ({ branch: branch.pattern })
      ))
    })

    it('should set #branches', () => {
      expect(subject)
        .to.have.property('branches')
        .be.an('array').that.satisfies((arr: unknown[]) => {
          return arr.length && arr.every(v => {
            return v instanceof CreateBranchProtectionCommand
          })
        })
    })
  })
})
