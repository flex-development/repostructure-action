/**
 * @file Unit Tests - UpdateLabelCommand
 * @module labels/commands/tests/unit/UpdateLabelCommand
 */

import api from '#fixtures/api.github.json' assert { type: 'json' }
import type { Label } from '#src/labels/types'
import { get } from '@flex-development/tutils'
import TestSubject from '../update.command'

describe('unit:labels/commands/UpdateLabelCommand', () => {
  describe('constructor', () => {
    let color: string
    let id: Label['id']
    let subject: TestSubject

    beforeAll(() => {
      subject = new TestSubject({
        color: color = faker.color.rgb(),
        id: id = get(api.graphql.repository.labels.nodes, '0.id')
      })
    })

    it('should set #color', () => {
      expect(subject).to.have.property('color', color.slice(1))
    })

    it('should set #id', () => {
      expect(subject).to.have.property('id', id)
    })
  })
})
