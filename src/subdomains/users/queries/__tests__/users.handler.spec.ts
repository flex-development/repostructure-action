/**
 * @file Unit Tests - UsersHandler
 * @module users/queries/tests/unit/UsersHandler
 */

import api from '#fixtures/api.github.json' assert { type: 'json' }
import OctokitProvider from '#fixtures/octokit.provider.fixture'
import type { User } from '#src/users/types'
import { select } from '@flex-development/tutils'
import { CqrsModule } from '@nestjs/cqrs'
import { Test, type TestingModule } from '@nestjs/testing'
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
    let users: User[]

    beforeAll(() => {
      users = api.graphql.users
    })

    it('should return github user objects array', async () => {
      // Arrange
      const query: UsersQuery = new UsersQuery({
        users: select(users, null, user => user.login)
      })

      // Act + Expect
      expect(await subject.execute(query)).to.have.deep.ordered.members(users)
    })
  })
})
