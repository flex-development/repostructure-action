/**
 * @file Unit Tests - UsersHandler
 * @module users/queries/tests/unit/UsersHandler
 */

import api from '#fixtures/api.github.json' assert { type: 'json' }
import OctokitProvider from '#fixtures/octokit.provider.fixture'
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
    it('should return github user objects array', async () => {
      // Arrange
      const query: UsersQuery = new UsersQuery({
        users: select(api.graphql.users, null, user => user.login)
      })

      // Act
      const result = await subject.execute(query)

      // Expect
      expect(result).to.be.an('array').that.is.not.empty
      expect(result).to.have.deep.ordered.members(api.graphql.users)
    })
  })
})
