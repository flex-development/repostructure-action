/**
 * @file Unit Tests - CreateLabelCommand
 * @module labels/commands/tests/unit/CreateLabelCommand
 */

import api from '#fixtures/api.github.json' assert { type: 'json' }
import type { Label } from '#src/labels/types'
import { at } from '@flex-development/tutils'
import TestSubject from '../create.command'

describe('unit:labels/commands/CreateLabelCommand', () => {
  describe('constructor', () => {
    let label: Label
    let subject: TestSubject

    beforeAll(() => {
      const { nodes } = api.graphql.repository.labels

      label = at(nodes, 0)
      subject = new TestSubject({ ...label, color: '#' + label.color })
    })

    it('should set #color', () => {
      expect(subject).to.have.property('color', label.color)
    })

    it('should set #description', () => {
      expect(subject).to.have.property('description', label.description)
    })

    it('should set #name', () => {
      expect(subject).to.have.property('name', label.name)
    })
  })
})
