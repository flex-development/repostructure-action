/**
 * @file Unit Tests - ManageEnvironmentsCommand
 * @module environments/commands/tests/unit/ManageEnvironmentsCommand
 */

import api from '#fixtures/api.github.json' assert { type: 'json' }
import CreateEnvironmentCommand from '../create.command'
import TestSubject from '../manage.command'

describe('unit:environments/commands/ManageEnvironmentsCommand', () => {
  describe('constructor', () => {
    let subject: TestSubject

    beforeAll(() => {
      subject = new TestSubject(api.graphql.repository.environments.nodes)
    })

    it('should set #environments', () => {
      expect(subject)
        .to.have.property('environments')
        .be.an('array').that.satisfies((arr: unknown[]) => {
          return arr.length && arr.every(v => {
            return v instanceof CreateEnvironmentCommand
          })
        })
    })
  })
})
