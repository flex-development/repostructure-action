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
import type { PayloadObject } from '#src/types'
import type { MutationVariables, QueryVariables } from '#tests/types'
import gqh from '#tests/utils/gqh'
import {
  at,
  isNull,
  merge,
  pick,
  select,
  type Omit
} from '@flex-development/tutils'
import { HttpResponse } from 'msw'
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
    PayloadObject<{ label: Label }>,
    MutationVariables<CreateLabelCommand>
  >('CreateLabel', ({ variables: { input } }) => {
    return HttpResponse.json({
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
    PayloadObject<{ clientMutationId: string }>,
    MutationVariables<DeleteLabelCommand>
  >('DeleteLabel', () => {
    return HttpResponse.json({
      data: { payload: { clientMutationId: CLIENT_MUTATION_ID } }
    })
  }),
  gqh.mutation<
    PayloadObject<{ label: Label }>,
    MutationVariables<UpdateLabelCommand>
  >('UpdateLabel', ({ variables: { input } }) => {
    const { nodes } = data.data.payload.labels

    return HttpResponse.json({
      data: {
        payload: {
          label: <Label>merge(nodes.find(({ id }) => id === input.id)!, input)
        }
      }
    })
  }),
  gqh.query<
    PayloadObject<{ id: string }>,
    Omit<QueryVariables, 'cursor'>
  >('GetRepository', () => {
    return HttpResponse.json({
      data: { payload: pick(data.data.payload, ['id']) }
    })
  }),
  gqh.query<
    PayloadObject<{ labels: { nodes: Label[] } }>,
    QueryVariables
  >('Labels', ({ variables: { cursor } }) => {
    const { edges, nodes } = data.data.payload.labels

    /**
     * Index of current edge.
     *
     * @var {number} i
     */
    let i: number = select(edges, null, e => e.cursor).indexOf(cursor ?? '')

    /**
     * Index of next edge.
     *
     * @var {number} j
     */
    const j: number = (i < 0 ? ++i : i) + 10

    return HttpResponse.json({
      data: {
        payload: {
          labels: {
            nodes: isNull(cursor) ? [] : nodes.slice(i, j),
            pageInfo: {
              endCursor: isNull(cursor)
                ? cursor
                : at(edges, j)?.cursor ?? null
            }
          }
        }
      }
    })
  })
)

global.server = server
