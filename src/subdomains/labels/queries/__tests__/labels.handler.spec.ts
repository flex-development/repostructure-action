/**
 * @file Unit Tests - LabelsQueryHandler
 * @module repostructure/labels/queries/tests/unit/LabelsQueryHandler
 */

import API_URL from '#fixtures/api-url.fixture'
import LABELS from '#fixtures/labels.fixture'
import OctokitProvider from '#fixtures/octokit.provider.fixture'
import OWNER from '#fixtures/owner.fixture'
import REPO from '#fixtures/repo.fixture'
import type { Label } from '#src/labels/types'
import { at, type Nullable } from '@flex-development/tutils'
import { Test, TestingModule } from '@nestjs/testing'
import { http, HttpResponse, type GraphQLJsonRequestBody } from 'msw'
import { setupServer, type SetupServer } from 'msw/node'
import TestSubject from '../labels.handler'
import LabelsQuery from '../labels.query'

describe('unit:labels/queries/LabelsQueryHandler', () => {
  let ref: TestingModule
  let server: SetupServer
  let subject: TestSubject

  afterAll(() => {
    server.close()
  })

  afterEach(() => {
    server.resetHandlers()
  })

  beforeAll(async () => {
    type Body = GraphQLJsonRequestBody<{ cursor: string }>
    type Params = Record<string, never>

    server = setupServer(
      http.post<Params, Body>(API_URL, async opts => {
        const { variables } = await opts.request.json()

        /**
         * Index of {@linkcode LABELS} midpoint.
         *
         * @const {number} midpoint
         */
        const midpoint: number = Math.floor(LABELS.length * 0.5)

        /**
         * Pagination cursor.
         *
         * @var {Nullable<string>} endCursor
         */
        let endCursor!: Nullable<string>

        /**
         * Repository label nodes.
         *
         * @var {Label[]} nodes
         */
        let nodes!: Label[]

        // get pagination cursor and label nodes
        switch (variables!.cursor) {
          case '':
            nodes = LABELS.slice(0, midpoint)
            endCursor = at(nodes, -1)!.id
            break
          case at(LABELS, midpoint - 1)!.id:
            nodes = LABELS.slice(midpoint)
            endCursor = null
            break
        }

        return HttpResponse.json({
          data: { payload: { labels: { nodes, pageInfo: { endCursor } } } }
        })
      })
    )

    ref = await Test.createTestingModule({
      providers: [OctokitProvider, TestSubject]
    }).compile()

    subject = ref.get(TestSubject)
    server.listen()
  })

  describe('#execute', () => {
    it('should return repository labels array', async () => {
      // Arrange
      const query: LabelsQuery = new LabelsQuery({ owner: OWNER, repo: REPO })

      // Act
      const result = await subject.execute(query)

      // Expect
      expect(result).to.be.an('array').that.is.not.empty
      expect(result).to.have.deep.ordered.members(LABELS)
    })
  })
})
