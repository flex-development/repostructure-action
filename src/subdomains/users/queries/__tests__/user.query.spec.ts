/**
 * @file Unit Tests - UserQuery
 * @module users/queries/tests/unit/UserQuery
 */

import api from '#fixtures/api.github.json' assert { type: 'json' }
import { get } from '@flex-development/tutils'
import TestSubject from '../user.query'

describe('unit:users/queries/UserQuery', () => {
  describe('constructor', () => {
    let login: string
    let subject: TestSubject

    beforeAll(() => {
      login = get(api.graphql.users, '0.login')
      subject = new TestSubject({ login })
    })

    it('should set #login', () => {
      expect(subject).to.have.property('login', login)
    })
  })
})
