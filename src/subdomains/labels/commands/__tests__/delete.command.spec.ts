/**
 * @file Unit Tests - DeleteLabelCommand
 * @module repostructure/labels/commands/tests/unit/DeleteLabelCommand
 */

import TestSubject from '../delete.command'

describe('unit:labels/commands/DeleteLabelCommand', () => {
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
