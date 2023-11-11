/**
 * @file Unit Tests - UpdateLabelCommand
 * @module repostructure/labels/commands/tests/unit/UpdateLabelCommand
 */

import data from '#fixtures/api.github.com/graphql.json' assert { type: 'json' }
import type { Label } from '#src/labels/types'
import { at } from '@flex-development/tutils'
import TestSubject from '../update.command'

describe('unit:labels/commands/UpdateLabelCommand', () => {
  describe('constructor', () => {
    let label: Label
    let subject: TestSubject

    beforeAll(() => {
      subject = new TestSubject(label = at(data.data.payload.labels.nodes, -1))
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
