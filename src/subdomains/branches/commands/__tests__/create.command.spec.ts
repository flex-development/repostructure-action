/**
 * @file Unit Tests - CreateBranchProtectionCommand
 * @module branches/commands/tests/unit/CreateBranchProtectionCommand
 */

import TestSubject from '../create.command'

describe('unit:branches/commands/CreateBranchProtectionCommand', () => {
  describe('constructor', () => {
    let branch: string
    let subject: TestSubject

    beforeAll(() => {
      subject = new TestSubject({ branch: branch = 'release/*' })
    })

    it('should set #branch', () => {
      expect(subject).to.have.property('branch', branch)
    })
  })
})
