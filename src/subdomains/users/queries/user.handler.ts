/**
 * @file Queries - UserHandler
 * @module repostructure/users/queries/UserHandler
 */

import type { User } from '#src/users/types'
import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs'
import { Octokit } from '@octokit/core'
import * as graphql from 'graphql'
import gql from 'graphql-tag'
import UserQuery from './user.query'

/**
 * GitHub user query handler.
 *
 * @see {@linkcode User}
 * @see {@linkcode UserQuery}
 *
 * @class
 * @implements {IQueryHandler<UserQuery, User>}
 */
@QueryHandler(UserQuery)
class UserHandler implements IQueryHandler<UserQuery, User> {
  /**
   * GraphQL query.
   *
   * @see https://docs.github.com/graphql/reference/queries#user
   *
   * @protected
   * @readonly
   * @instance
   * @member {string} operation
   */
  protected readonly operation: string

  /**
   * Create a new GitHub user query handler.
   *
   * @see {@linkcode Octokit}
   *
   * @param {Octokit} octokit - Hydrated octokit client
   */
  constructor(protected readonly octokit: Octokit) {
    this.operation = graphql.print(gql`
      query User($login: String!) {
        payload: user(login: $login) {
          id
          login
        }
      }
    `)
  }

  /**
   * Execute a GitHub user query.
   *
   * @see {@linkcode User}
   * @see {@linkcode UserQuery}
   *
   * @public
   * @async
   *
   * @param {UserQuery} query - Query to execute
   * @return {Promise<User>} GitHub user object
   */
  public async execute(query: UserQuery): Promise<User> {
    const { payload } = await this.octokit.graphql<User>({
      login: query.login,
      query: this.operation
    })

    return payload
  }
}

export default UserHandler
