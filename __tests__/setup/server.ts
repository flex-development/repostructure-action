/**
 * @file Test Setup - server
 * @module tests/setup/server
 */

import root from '#fixtures/api.github.com/graphql.json' assert { type: 'json' }
import CLIENT_MUTATION_ID from '#fixtures/client-mutation-id.fixture'
import type Branch from '#src/branches/types/branch'
import type Environment from '#src/environments/types/environment'
import type CreateLabelInput from '#src/labels/commands/create.command'
import type UpdateLabelInput from '#src/labels/commands/update.command'
import type Label from '#src/labels/types/label'
import type Team from '#src/teams/types/team'
import type User from '#src/users/types/user'
import connection from '#tests/utils/connection'
import * as mlly from '@flex-development/mlly'
import pathe from '@flex-development/pathe'
import {
  assign,
  includes,
  pick,
  select,
  shake,
  template,
  type EmptyObject,
  type Nullable,
  type Optional,
  type TemplateData
} from '@flex-development/tutils'
import type { Connection } from '@octokit/graphql'
import type {
  RepositoryBranchProtectionRulesArgs as BranchesArgs,
  CreateEnvironmentInput,
  RepositoryEnvironmentsArgs as EnvironmentsArgs,
  RepositoryLabelsArgs as LabelsArgs,
  QueryUserArgs,
  OrganizationTeamArgs as TeamArgs,
  UpdateEnvironmentInput
} from '@octokit/graphql-schema'
import type { Endpoints } from '@octokit/types'
import {
  GraphQLError,
  graphql as executeGraphql,
  type ExecutionResult
} from 'graphql'
import { HttpResponse, graphql, http } from 'msw'
import { setupServer, type SetupServer } from 'msw/node'
import schema from './graphql/schema'

/**
 * Get a relative path to a fixture file.
 *
 * @param {string} fmt - Fixture path template
 * @param {TemplateData} data - Fixture path template data
 * @return {string} Relative path to fixture
 */
const fixture = (fmt: string, data: TemplateData): string => {
  return template(
    pathe.join('__fixtures__', 'api.github.com', pathe.addExt(fmt, '.json')),
    data
  )
}

/**
 * Mock server.
 *
 * @see {@linkcode SetupServer}
 * @see https://mswjs.io/docs/api/setup-server
 *
 * @const {SetupServer} server
 */
const server: SetupServer = setupServer(
  http.get<
    Endpoints['GET /apps/{app_slug}']['parameters'],
    EmptyObject,
    Endpoints['GET /apps/{app_slug}']['response']['data']
  >(/\/apps\/(?<app_slug>[\w-]+)$/, async ({ params }) => {
    /**
     * Relative path to app data fixture.
     *
     * @const {string} data
     */
    const data: string = fixture('apps/{app_slug}', params)

    // return error response if app was not found
    if (!mlly.isFile(data)) {
      return HttpResponse.json({
        documentation_url: 'https://docs.github.com/rest/apps/apps#get-an-app',
        message: 'Not Found'
      }, {
        status: 404,
        statusText: 'Not Found'
      })
    }

    return HttpResponse.json(await import(data, { assert: { type: 'json' } }))
  }),
  graphql.link(/\/graphql$/).operation<ExecutionResult>(async ({
    operationName,
    query,
    variables
  }) => {
    const { data, errors } = await executeGraphql({
      operationName,
      rootValue: {
        /**
         * Mock `createEnvironment` mutation resolver.
         *
         * @see https://docs.github.com/graphql/reference/mutations#createenvironment
         *
         * @param {Record<'input', CreateEnvironmentInput>} args - Mutation args
         * @return {{ environment: Environment }} New environment payload
         */
        createEnvironment(
          args: Record<'input', CreateEnvironmentInput>
        ): { environment: Environment } {
          return {
            environment: {
              id: faker.string.nanoid(),
              name: args.input.name
            }
          }
        },
        /**
         * Mock `createLabel` mutation resolver.
         *
         * @see https://docs.github.com/graphql/reference/mutations#createlabel
         *
         * @param {Record<'input', CreateLabelInput>} args - Mutation args
         * @return {{ label: Label }} New label payload
         * @throws {GraphQLError} If label name is not unique
         */
        createLabel(args: Record<'input', CreateLabelInput>): { label: Label } {
          const { nodes } = root.data.repository.labels

          // throw if label name is not unique
          if (includes(nodes, args.input.name, 0, node => node!.name)) {
            throw new GraphQLError('Name has already been taken', {
              extensions: { type: 'UNPROCESSABLE' }
            })
          }

          return {
            label: <Label>{
              ...pick(args.input, ['color', 'description', 'name']),
              id: faker.string.nanoid()
            }
          }
        },
        /**
         * Mock `deleteEnvironment` mutation resolver.
         *
         * @see https://docs.github.com/graphql/reference/mutations#deleteenvironment
         *
         * @return {{ clientMutationId: string }} Deleted environment payload
         */
        deleteEnvironment(): { clientMutationId: string } {
          return { clientMutationId: CLIENT_MUTATION_ID }
        },
        /**
         * Mock `deleteLabel` mutation resolver.
         *
         * @see https://docs.github.com/graphql/reference/mutations#deletelabel
         *
         * @return {{ clientMutationId: string }} Deleted label payload
         */
        deleteLabel(): { clientMutationId: string } {
          return { clientMutationId: CLIENT_MUTATION_ID }
        },
        /**
         * Mock `organization` object.
         *
         * @see https://docs.github.com/graphql/reference/objects#organization
         */
        organization: {
          /**
           * Node ID of organization.
           *
           * @const {string} id
           */
          id: root.data.organization.id,
          /**
           * Organization login.
           *
           * @const {string} login
           */
          login: root.data.organization.login,
          /**
           * Mock organization `team` query resolver.
           *
           * @param {TeamArgs} args - Query arguments
           * @return {Nullable<Team>} Team object or `null`
           */
          team(args: TeamArgs): Nullable<Team> {
            const { nodes } = root.data.organization.teams
            return nodes.find(node => node.slug === args.slug) ?? null
          }
        },
        /**
         * Mock `repository` object.
         *
         * @see https://docs.github.com/graphql/reference/objects#repository
         */
        repository: {
          /**
           * Mock repository `branchProtectionRules` query resolver.
           *
           * @param {BranchesArgs} args - Query arguments
           * @return {Connection<Branch>} Protected branch connection object
           */
          branchProtectionRules(args: BranchesArgs): Connection<Branch> {
            return connection('branchProtectionRules', args.after)
          },
          /**
           * Mock repository `environments` query resolver.
           *
           * @param {EnvironmentsArgs} args - Query arguments
           * @return {Connection<Environment>} Environment connection object
           */
          environments(args: EnvironmentsArgs): Connection<Environment> {
            return connection('environments', args.after, 1)
          },
          /**
           * Node ID of repository.
           *
           * @const {string} id
           */
          id: root.data.repository.id,
          /**
           * Mock repository `labels` query resolver.
           *
           * @param {LabelsArgs} args - Query arguments
           * @return {Connection<Label>} Label connection object
           */
          labels(args: LabelsArgs): Connection<Label> {
            return connection('labels', args.after)
          }
        },
        /**
         * Mock `updateEnvironment` mutation resolver.
         *
         * @see https://docs.github.com/graphql/reference/mutations#updateenvironment
         *
         * @param {Record<'input', UpdateEnvironmentInput>} args - Mutation args
         * @return {{ environment: Environment }} Updated environment payload
         * @throws {GraphQLError} If environment to update is not found
         */
        updateEnvironment(
          args: Record<'input', UpdateEnvironmentInput>
        ): { environment: Environment } {
          const { nodes } = root.data.repository.environments

          /**
           * Environment to update.
           *
           * @const {Optional<Environment>} node
           */
          const node: Optional<Environment> = nodes.find(({ id }) => {
            return id === args.input.environmentId
          })

          // throw if environment was not found
          if (!node) {
            /**
             * Error message.
             *
             * @const {string} message
             */
            const message: string =
              `Could not resolve to a node with the global id of '${args.input.environmentId}'`

            throw new GraphQLError(message, {
              extensions: { type: 'NOT_FOUND' }
            })
          }

          return { environment: node }
        },
        /**
         * Mock `updateLabel` mutation resolver.
         *
         * @see https://docs.github.com/graphql/reference/mutations#updatelabel
         *
         * @param {Record<'input', UpdateLabelInput>} args - Mutation args
         * @return {{ label: Label }} Updated label payload
         * @throws {GraphQLError} If label to update is not found
         */
        updateLabel(args: Record<'input', UpdateLabelInput>): { label: Label } {
          const { nodes } = root.data.repository.labels

          /**
           * Label to update.
           *
           * @const {Optional<Label>} node
           */
          const node: Optional<Label> = nodes.find(({ id }) => {
            return id === args.input.id
          })

          // throw if label was not found
          if (!node) {
            /**
             * Error message.
             *
             * @const {string} message
             */
            const message: string =
              `Could not resolve to Label node with the global id of '${args.input.id}'`

            throw new GraphQLError(message, {
              extensions: { type: 'NOT_FOUND' }
            })
          }

          return { label: <Label>assign(node, args.input) }
        },
        /**
         * Mock `user` query resolver.
         *
         * @see https://docs.github.com/graphql/reference/queries#user
         *
         * @param {QueryUserArgs} args - Query arguments
         * @return {User} User object
         * @throws {GraphQLError} If user is not found
         */
        user(args: QueryUserArgs): User {
          /**
           * User with username {@linkcode args.login}, if any.
           *
           * @const {Optional<User>} user
           */
          const user: Optional<User> = root.data.users.find(user => {
            return user.login === args.login
          })

          // throw if user was not found
          if (!user) {
            /**
             * Error message.
             *
             * @const {string} message
             */
            const message: string =
              `Could not resolve to a User with the login of '${args.login}'`

            throw new GraphQLError(message, {
              extensions: { type: 'NOT_FOUND' }
            })
          }

          return user
        }
      },
      schema,
      source: query,
      variableValues: <Record<string, unknown>>variables
    })

    return HttpResponse.json(shake({
      data: data!,
      errors: errors
        ? select(errors, null, e => ({ ...e.toJSON(), ...e.extensions }))
        : undefined
    }))
  })
)

global.server = server
