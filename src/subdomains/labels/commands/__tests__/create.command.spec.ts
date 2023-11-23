/**
 * @file Unit Tests - CreateLabelCommand
 * @module labels/commands/tests/unit/CreateLabelCommand
 */

import api from '#fixtures/api.github.json' assert { type: 'json' }
import type { Label } from '#src/labels/types'
import { get } from '@flex-development/tutils'
import TestSubject from '../create.command'

describe('unit:labels/commands/CreateLabelCommand', () => {
  describe('constructor', () => {
    let color: string
    let name: Label['name']
    let subject: TestSubject

    beforeAll(() => {
      subject = new TestSubject({
        color: color = faker.color.rgb(),
        name: name = get(api.graphql.repository.labels.nodes, '0.name')
      })
    })

    it('should set #color', () => {
      expect(subject).to.have.property('color', color.slice(1))
    })

    it('should set #name', () => {
      expect(subject).to.have.property('name', name)
    })
  })
})
