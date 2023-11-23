/**
 * @file Unit Tests - ManageLabelsCommand
 * @module labels/commands/tests/unit/ManageLabelsCommand
 */

import api from '#fixtures/api.github.json' assert { type: 'json' }
import { select } from '@flex-development/tutils'
import CreateLabelCommand from '../create.command'
import TestSubject from '../manage.command'

describe('unit:labels/commands/ManageLabelsCommand', () => {
  describe('constructor', () => {
    let subject: TestSubject

    beforeAll(() => {
      subject = new TestSubject(
        select(api.graphql.repository.labels.nodes, null, node => ({
          color: faker.color.rgb(),
          name: node.name
        }))
      )
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
