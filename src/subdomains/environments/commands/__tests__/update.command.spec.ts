/**
 * @file Unit Tests - UpdateEnvironmentCommand
 * @module environments/commands/tests/unit/UpdateEnvironmentCommand
 */

import TestSubject from '../update.command'

describe('unit:environments/commands/UpdateEnvironmentCommand', () => {
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
