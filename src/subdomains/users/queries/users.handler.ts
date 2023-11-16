/**
 * @file Queries - UsersHandler
 * @module repostructure/users/queries/UsersHandler
 */

import type { User } from '#src/users/types'
import { reduceAsync } from '@flex-development/tutils'
import { QueryBus, QueryHandler, type IQueryHandler } from '@nestjs/cqrs'
import UserQuery from './user.query'
import UsersQuery from './users.query'

/**
 * GitHub users query handler.
 *
 * @see {@linkcode User}
 * @see {@linkcode UsersQuery}
 *
 * @class
 * @implements {IQueryHandler<UsersQuery, User[]>}
 */
@QueryHandler(UsersQuery)
class UsersHandler implements IQueryHandler<UsersQuery, User[]> {
  /**
   * Create a new GitHub users query handler.
   *
   * @see {@linkcode QueryBus}
   *
   * @param {QueryBus} queries - Query bus
   */
  constructor(protected readonly queries: QueryBus) {}

  /**
   * Execute a GitHub users query.
   *
   * @see {@linkcode User}
   * @see {@linkcode UsersQuery}
   *
   * @public
   * @async
   *
   * @param {UsersQuery} query - Query to execute
   * @return {Promise<User[]>} GitHub user objects array
   */
  public async execute(query: UsersQuery): Promise<User[]> {
    return reduceAsync(query.logins, async (acc, login) => [
      ...acc,
      await this.queries.execute(new UserQuery({ login }))
    ], <User[]>[])
  }
}

export default UsersHandler
