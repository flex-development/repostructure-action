/**
 * @file Unit Tests - UserHandler
 * @module users/queries/tests/unit/UserHandler
 */

import api from '#fixtures/api.github.json' assert { type: 'json' }
import OctokitProvider from '#fixtures/octokit.provider.fixture'
import type { User } from '#src/users/types'
import { at } from '@flex-development/tutils'
import { Test, type TestingModule } from '@nestjs/testing'
import TestSubject from '../user.handler'
import UserQuery from '../user.query'

describe('unit:users/queries/UserHandler', () => {
  let ref: TestingModule
  let subject: TestSubject

  beforeAll(async () => {
    ref = await Test.createTestingModule({
      providers: [OctokitProvider, TestSubject]
    }).compile()

    subject = ref.get(TestSubject)
  })

  describe('#execute', () => {
    let user: User

    beforeAll(() => {
      user = at(api.graphql.users, 0)
    })

    it('should return github user object', async () => {
      expect(await subject.execute(new UserQuery(user))).to.eql(user)
    })
  })
})
