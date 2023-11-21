/**
 * @file Queries - TeamHandler
 * @module repostructure/teams/queries/TeamHandler
 */

import { Octokit } from '#src/octokit'
import type { Team } from '#src/teams/types'
import type { Nullable, Optional } from '@flex-development/tutils'
import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs'
import {
  GraphqlResponseError,
  type GraphQlEndpointOptions,
  type GraphQlQueryResponse
} from '@octokit/graphql'
import * as graphql from 'graphql'
import gql from 'graphql-tag'
import TeamQuery from './team.query'

/**
 * Team query handler.
 *
 * @see {@linkcode Team}
 * @see {@linkcode TeamQuery}
 *
 * @class
 * @implements {IQueryHandler<TeamQuery, Team>}
 */
@QueryHandler(TeamQuery)
class TeamHandler implements IQueryHandler<TeamQuery, Team> {
  /**
   * GraphQL query.
   *
   * @see https://docs.github.com/graphql/reference/queries#organization
   *
   * @protected
   * @readonly
   * @instance
   * @member {string} operation
   */
  protected readonly operation: string

  /**
   * Create a new team query handler.
   *
   * @see {@linkcode Octokit}
   *
   * @param {Octokit} octokit - Hydrated octokit client
   */
  constructor(protected readonly octokit: Octokit) {
    this.operation = graphql.print(gql`
      query Team($org: String!, $team: String!) {
        payload: organization(login: $org) {
          id
          team(slug: $team) {
            id
            slug
          }
        }
      }
    `)
  }

  /**
   * Execute a team query.
   *
   * @see {@linkcode Team}
   * @see {@linkcode TeamQuery}
   *
   * @public
   * @async
   *
   * @param {TeamQuery} query - Query to execute
   * @return {Promise<Team>} Team object
   * @throws {GraphqlResponseError}
   */
  public async execute(query: TeamQuery): Promise<Team> {
    /**
     * GraphQL endpoint options.
     *
     * @const {GraphQlEndpointOptions} request
     */
    const request: GraphQlEndpointOptions = {
      method: 'POST',
      query: this.operation,
      url: '/graphql',
      variables: { ...query }
    }

    // get team by slug
    const {
      headers,
      data: { data, errors = [] }
    } = await this.octokit.request<GraphQlQueryResponse<Optional<{
      payload: Nullable<{ team: Nullable<Team> }>
    }>>>(request)

    // push new error if team was not found
    if (data?.payload && !data.payload.team) {
      const { team } = query

      /**
       * Error message.
       *
       * @const {string} m
       */
      const m: string = `Could not resolve to a Team with the slug of '${team}'`

      // push team not found error
      errors.push(<never>{
        ...new graphql.GraphQLError(m).toJSON(),
        type: 'NOT_FOUND'
      })
    }

    // throw graphql response error
    if (errors.length) {
      throw new GraphqlResponseError(request, headers, { data, errors })
    }

    return data!.payload!.team!
  }
}

export default TeamHandler
