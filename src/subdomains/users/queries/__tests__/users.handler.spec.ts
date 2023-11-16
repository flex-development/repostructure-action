/**
 * @file Unit Tests - UsersHandler
 * @module users/queries/tests/unit/UsersHandler
 */

import data from '#fixtures/api.github.com/graphql.json' assert { type: 'json' }
import OctokitProvider from '#fixtures/octokit.provider.fixture'
import type { User } from '#src/users/types'
import { select } from '@flex-development/tutils'
import { CqrsModule } from '@nestjs/cqrs'
import { Test, TestingModule } from '@nestjs/testing'
import UserHandler from '../user.handler'
import TestSubject from '../users.handler'
import UsersQuery from '../users.query'

describe('unit:users/queries/UsersHandler', () => {
  let ref: TestingModule
  let subject: TestSubject

  beforeAll(async () => {
    ref = await (await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [OctokitProvider, TestSubject, UserHandler]
    }).compile()).init()

    subject = ref.get(TestSubject)
  })

  describe('#execute', () => {
    let logins: string[]
    let users: User[]

    beforeAll(() => {
      users = data.data.users
      logins = select(users, null, user => user.login)
    })

    it('should return github user objects array', async () => {
      // Arrange
      const query: UsersQuery = new UsersQuery({ logins })

      // Act + Expect
      expect(await subject.execute(query)).to.have.deep.ordered.members(users)
    })
  })
})
