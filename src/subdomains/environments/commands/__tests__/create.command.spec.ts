/**
 * @file Unit Tests - CreateEnvironmentCommand
 * @module environments/commands/tests/unit/CreateEnvironmentCommand
 */

import api from '#fixtures/api.github.json' assert { type: 'json' }
import type { Reviewers } from '#src/environments/types'
import { get } from '@flex-development/tutils'
import TestSubject from '../create.command'

describe('unit:environments/commands/CreateEnvironmentCommand', () => {
  describe('constructor', () => {
    let name: string
    let reviewers: Partial<Reviewers>
    let subject: TestSubject

    beforeAll(() => {
      subject = new TestSubject({
        name: name = 'production',
        reviewers: reviewers = { users: [get(api.graphql.users, '0.login')] }
      })
    })

    it('should set #name', () => {
      expect(subject).to.have.property('name', name)
    })

    it('should set #prevent_self_review', () => {
      expect(subject).to.have.property('prevent_self_review').be.null
    })

    it('should set #reviewers', () => {
      expect(subject).to.have.deep.property('reviewers', reviewers)
    })

    it('should set #wait_timer', () => {
      expect(subject).to.have.property('wait_timer').be.null
    })
  })
})
