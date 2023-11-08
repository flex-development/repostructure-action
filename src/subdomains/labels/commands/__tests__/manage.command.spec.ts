/**
 * @file Unit Tests - ManageLabelsCommand
 * @module repostructure/labels/commands/tests/unit/ManageLabelsCommand
 */

import LABELS from '#fixtures/labels.fixture'
import { select } from '@flex-development/tutils'
import CreateLabelCommand from '../create.command'
import TestSubject from '../manage.command'

describe('unit:labels/commands/ManageLabelsCommand', () => {
  describe('constructor', () => {
    let labels: CreateLabelCommand[]
    let subject: TestSubject

    beforeAll(() => {
      labels = select(LABELS, null, label => new CreateLabelCommand(label))
      subject = new TestSubject(labels)
    })

    it('should set #labels', () => {
      expect(subject).to.have.deep.property('labels', labels)
    })
  })
})
