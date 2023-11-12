/**
 * @file Test Setup - server
 * @module tests/setup/server
 */

import data from '#fixtures/api.github.com/graphql.json' assert { type: 'json' }
import CLIENT_MUTATION_ID from '#fixtures/client-mutation-id.fixture'
import type {
  CreateLabelCommand,
  DeleteLabelCommand,
  UpdateLabelCommand
} from '#src/labels/commands'
import type { Label } from '#src/labels/types'
import type {
  GQLPayload,
  MutationVariables,
  QueryVariables
} from '#tests/types'
import gqh from '#tests/utils/gqh'
import GQLResponse from '#tests/utils/gql-response'
import { merge, pick, type Omit } from '@flex-development/tutils'
import { setupServer, type SetupServer } from 'msw/node'

/**
 * Mock server.
 *
 * @see {@linkcode SetupServer}
 * @see https://mswjs.io/docs/api/setup-server
 *
 * @const {SetupServer} server
 */
const server: SetupServer = setupServer(
  gqh.mutation<
    GQLPayload<'label', Label>,
    MutationVariables<CreateLabelCommand>
  >('CreateLabel', ({ variables: { input } }) => {
    return GQLResponse.json({
      data: {
        payload: {
          label: <Label>{
            ...pick(input, ['color', 'description', 'name']),
            id: faker.string.nanoid()
          }
        }
      }
    })
  }),
  gqh.mutation<
    GQLPayload<'clientMutationId', string>,
    MutationVariables<DeleteLabelCommand>
  >('DeleteLabel', () => {
    return GQLResponse.json({
      data: { payload: { clientMutationId: CLIENT_MUTATION_ID } }
    })
  }),
  gqh.mutation<
    GQLPayload<'label', Label>,
    MutationVariables<UpdateLabelCommand>
  >('UpdateLabel', ({ variables: { input } }) => {
    const { nodes } = data.data.repository.labels

    return GQLResponse.json({
      data: {
        payload: {
          label: <Label>merge(nodes.find(({ id }) => id === input.id)!, input)
        }
      }
    })
  }),
  gqh.query<
    GQLPayload<'id', string>,
    Omit<QueryVariables, 'cursor'>
  >('GetRepository', () => {
    return GQLResponse.json({
      data: { payload: pick(data.data.repository, ['id']) }
    })
  }),
  gqh.query<
    GQLPayload<'labels', Label[]>,
    QueryVariables
  >('Labels', ({ variables }) => {
    return GQLResponse.paginate({ ...variables, key: 'labels' })
  })
)

global.server = server
