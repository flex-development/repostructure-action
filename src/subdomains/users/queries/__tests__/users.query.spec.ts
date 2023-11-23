/**
 * @file Unit Tests - UsersQuery
 * @module users/queries/tests/unit/UsersQuery
 */

import api from '#fixtures/api.github.json' assert { type: 'json' }
import { get } from '@flex-development/tutils'
import TestSubject from '../users.query'

describe('unit:users/queries/UsersQuery', () => {
  describe('constructor', () => {
    let subject: TestSubject
    let users: string[]

    beforeAll(() => {
      users = [get(api.graphql.users, '0.login')]
      subject = new TestSubject({ users: users })
    })

    it('should set #users', () => {
      expect(subject).to.have.deep.property('users', users)
    })
  })
})
