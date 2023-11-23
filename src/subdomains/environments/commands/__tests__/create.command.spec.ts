/**
 * @file Unit Tests - CreateEnvironmentCommand
 * @module environments/commands/tests/unit/CreateEnvironmentCommand
 */

import TestSubject from '../create.command'

describe('unit:environments/commands/CreateEnvironmentCommand', () => {
  describe('constructor', () => {
    let environment: string
    let subject: TestSubject

    beforeAll(() => {
      subject = new TestSubject({ environment: environment = 'production' })
    })

    it('should set #environment', () => {
      expect(subject).to.have.property('environment', environment)
    })
  })
})
