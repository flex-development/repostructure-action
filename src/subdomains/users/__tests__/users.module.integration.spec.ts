/**
 * @file Integration Tests - UsersModule
 * @module users/tests/integration/UsersModule
 */

import data from '#fixtures/api.github.com/graphql.json' assert { type: 'json' }
import INPUT_CONFIG from '#fixtures/input-config.fixture'
import { ConfigModule } from '#src/config'
import { OctokitModule } from '#src/octokit'
import {
  UserHandler,
  UserQuery,
  UsersHandler,
  UsersQuery
} from '#src/users/queries'
import type { Spy } from '#tests/interfaces'
import env from '#tests/setup/env'
import { get, select } from '@flex-development/tutils'
import { CqrsModule, QueryBus } from '@nestjs/cqrs'
import { Test, type TestingModule } from '@nestjs/testing'
import TestSubject from '../users.module'

describe('integration:users/UsersModule', () => {
  let queries: QueryBus
  let ref: TestingModule
  let spies: Record<string, Spy>
  let user: Spy<UserHandler['execute']>
  let users: Spy<UsersHandler['execute']>

  beforeAll(async () => {
    env((): void => {
      return void vi.stubEnv('INPUT_CONFIG', INPUT_CONFIG)
    })

    ref = await (await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        CqrsModule.forRoot(),
        OctokitModule,
        TestSubject
      ]
    }).compile()).init()

    queries = ref.get(QueryBus)
  })

  beforeEach(() => {
    user = vi.spyOn(UserHandler.prototype, 'execute')
    users = vi.spyOn(UsersHandler.prototype, 'execute')

    user = user.mockImplementation(async () => ({ id: '', login: '' }))
    users = users.mockImplementation(async () => [])

    user = user.mockName('UserHandler#execute')
    users = users.mockName('UsersHandler#execute')

    spies = { UserQuery: user, UsersQuery: users }
  })

  describe('queries', () => {
    describe.each<[string, UserQuery | UsersQuery]>([
      ['UserQuery', new UserQuery({ login: get(data.data.users, '0.login') })],
      ['UsersQuery', new UsersQuery({
        logins: select(data.data.users, null, user => user.login)
      })]
    ])('%s', (key, query) => {
      it('should execute query', async () => {
        // Arrange
        const spy: Spy = spies[key]!

        // Act
        await queries.execute(query)

        // Expect
        expect(spy).toHaveBeenCalledOnce()
        expect(spy).toHaveBeenCalledWith(query)
      })
    })
  })
})
