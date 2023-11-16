/**
 * @file Unit Tests - ManageLabelsCommand
 * @module labels/commands/tests/unit/ManageLabelsCommand
 */

import data from '#fixtures/api.github.com/graphql.json' assert { type: 'json' }
import { select } from '@flex-development/tutils'
import CreateLabelCommand from '../create.command'
import TestSubject from '../manage.command'

describe('unit:labels/commands/ManageLabelsCommand', () => {
  describe('constructor', () => {
    let labels: CreateLabelCommand[]
    let subject: TestSubject

    beforeAll(() => {
      labels = data.data.repository.labels.nodes
      labels = select(labels, null, label => new CreateLabelCommand(label))
      subject = new TestSubject(labels)
    })

    it('should set #labels', () => {
      expect(subject).to.have.deep.property('labels', labels)
    })
  })
})
