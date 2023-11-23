/**
 * @file Unit Tests - EnvironmentDTO
 * @module environments/dto/tests/unit/EnvironmentDTO
 */

import api from '#fixtures/api.github.json' assert { type: 'json' }
import type { Reviewers } from '#src/environments/types'
import { get } from '@flex-development/tutils'
import TestSubject from '../environment.dto'

describe('unit:environments/dto/EnvironmentDTO', () => {
  describe('constructor', () => {
    let reviewers: Partial<Reviewers>
    let subject: TestSubject
    let wait_timer: number

    beforeAll(() => {
      subject = new TestSubject({
        reviewers: reviewers = { users: [get(api.graphql.users, '0.login')] },
        wait_timer: wait_timer = faker.number.int({ max: 43_200, min: 0 })
      })
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
