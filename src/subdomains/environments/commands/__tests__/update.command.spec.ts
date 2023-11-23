/**
 * @file Unit Tests - UpdateEnvironmentCommand
 * @module environments/commands/tests/unit/UpdateEnvironmentCommand
 */

import api from '#fixtures/api.github.json' assert { type: 'json' }
import type { Reviewers } from '#src/environments/types'
import { get } from '@flex-development/tutils'
import TestSubject from '../update.command'

describe('unit:environments/commands/UpdateEnvironmentCommand', () => {
  describe('constructor', () => {
    let id: string
    let reviewers: Partial<Reviewers>
    let subject: TestSubject
    let wait_timer: number

    beforeAll(() => {
      subject = new TestSubject({
        id: id = faker.string.nanoid(),
        reviewers: reviewers = {
          teams: [get(api.graphql.organization.teams.nodes, '0.slug')],
          users: [get(api.graphql.users, '0.login')]
        },
        wait_timer: wait_timer = 0
      })
    })

    it('should set #id', () => {
      expect(subject).to.have.property('id', id)
    })

    it('should set #prevent_self_review', () => {
      expect(subject).to.have.property('prevent_self_review').be.null
    })

    it('should set #reviewers', () => {
      expect(subject).to.have.deep.property('reviewers', reviewers)
    })

    it('should set #wait_timer', () => {
      expect(subject).to.have.property('wait_timer', wait_timer)
    })
  })
})
