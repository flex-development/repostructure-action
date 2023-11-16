/**
 * @file Unit Tests - DeleteEnvironmentCommand
 * @module environments/commands/tests/unit/DeleteEnvironmentCommand
 */

import TestSubject from '../delete.command'

describe('unit:environments/commands/DeleteEnvironmentCommand', () => {
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
