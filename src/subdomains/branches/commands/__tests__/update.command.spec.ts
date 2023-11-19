/**
 * @file Unit Tests - UpdateBranchProtectionCommand
 * @module branches/commands/tests/unit/UpdateBranchProtectionCommand
 */

import TestSubject from '../update.command'

describe('unit:branches/commands/UpdateBranchProtectionCommand', () => {
  describe('constructor', () => {
    let subject: TestSubject

    beforeAll(() => {
      subject = new TestSubject({ id: faker.string.nanoid() })
    })

    it('should set #id', () => {
      expect(subject).to.have.property('id').be.a('string').that.is.not.empty
    })
  })
})
