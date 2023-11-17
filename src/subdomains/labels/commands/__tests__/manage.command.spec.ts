/**
 * @file Unit Tests - ManageLabelsCommand
 * @module labels/commands/tests/unit/ManageLabelsCommand
 */

import data from '#fixtures/api.github.com/graphql.json' assert { type: 'json' }
import CreateLabelCommand from '../create.command'
import TestSubject from '../manage.command'

describe('unit:labels/commands/ManageLabelsCommand', () => {
  describe('constructor', () => {
    let subject: TestSubject

    beforeAll(() => {
      subject = new TestSubject(data.data.repository.labels.nodes)
    })

    it('should set #labels', () => {
      expect(subject)
        .to.have.property('labels')
        .be.an('array').that.satisfies((arr: unknown[]) => {
          return arr.length && arr.every(v => v instanceof CreateLabelCommand)
        })
    })
  })
})
