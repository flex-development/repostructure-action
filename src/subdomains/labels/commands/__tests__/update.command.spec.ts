/**
 * @file Unit Tests - UpdateLabelCommand
 * @module repostructure/labels/commands/tests/unit/UpdateLabelCommand
 */

import LABELS from '#fixtures/labels.fixture'
import type { Label } from '#src/labels/types'
import { at } from '@flex-development/tutils'
import TestSubject from '../update.command'

describe('unit:labels/commands/UpdateLabelCommand', () => {
  describe('constructor', () => {
    let label: Label
    let subject: TestSubject

    beforeAll(() => {
      label = at(LABELS, 0)
      subject = new TestSubject(label)
    })

    it('should set #color', () => {
      expect(subject).to.have.property('color', label.color)
    })

    it('should set #description', () => {
      expect(subject).to.have.property('description', label.description)
    })

    it('should set #id', () => {
      expect(subject).to.have.property('id', label.id)
    })

    it('should set #name', () => {
      expect(subject).to.have.property('name', label.name)
    })
  })
})
