/**
 * @file Unit Tests - DeleteBranchProtectionCommand
 * @module branches/commands/tests/unit/DeleteBranchProtectionCommand
 */

import TestSubject from '../delete.command'

describe('unit:branches/commands/DeleteBranchProtectionCommand', () => {
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
