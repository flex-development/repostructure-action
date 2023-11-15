/**
 * @file Unit Tests - UsersQuery
 * @module repostructure/users/queries/tests/unit/UsersQuery
 */

import data from '#fixtures/api.github.com/graphql.json' assert { type: 'json' }
import { get } from '@flex-development/tutils'
import TestSubject from '../users.query'

describe('unit:users/queries/UsersQuery', () => {
  describe('constructor', () => {
    let logins: string[]
    let subject: TestSubject

    beforeAll(() => {
      logins = [get(data.data.users, '0.login')]
      subject = new TestSubject({ logins })
    })

    it('should set #logins', () => {
      expect(subject).to.have.deep.property('logins', logins)
    })
  })
})
