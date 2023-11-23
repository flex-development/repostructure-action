/**
 * @file Unit Tests - CreateEnvironmentCommand
 * @module environments/commands/tests/unit/CreateEnvironmentCommand
 */

import TestSubject from '../create.command'

describe('unit:environments/commands/CreateEnvironmentCommand', () => {
  describe('constructor', () => {
    let name: string
    let subject: TestSubject

    beforeAll(() => {
      subject = new TestSubject({ name: name = 'production' })
    })

    it('should set #name', () => {
      expect(subject).to.have.property('name', name)
    })
  })
})
