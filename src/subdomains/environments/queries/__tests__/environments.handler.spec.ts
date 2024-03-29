/**
 * @file Unit Tests - EnvironmentsHandler
 * @module environments/queries/tests/unit/EnvironmentsHandler
 */

import api from '#fixtures/api.github.json' assert { type: 'json' }
import OctokitProvider from '#fixtures/octokit.provider.fixture'
import type { Environment } from '#src/environments/types'
import { Test, type TestingModule } from '@nestjs/testing'
import TestSubject from '../environments.handler'
import EnvironmentsQuery from '../environments.query'

describe('unit:environments/queries/EnvironmentsHandler', () => {
  let ref: TestingModule
  let subject: TestSubject

  beforeAll(async () => {
    ref = await Test.createTestingModule({
      providers: [OctokitProvider, TestSubject]
    }).compile()

    subject = ref.get(TestSubject)
  })

  describe('#execute', () => {
    let environments: Environment[]

    beforeAll(() => {
      environments = api.graphql.repository.environments.nodes
    })

    it('should return environments array', async () => {
      // Arrange
      const query: EnvironmentsQuery = new EnvironmentsQuery({
        owner: api.graphql.organization.login,
        repo: api.graphql.repository.name
      })

      // Act
      const result = await subject.execute(query)

      // Expect
      expect(result).to.be.an('array').that.is.not.empty
      expect(result).to.have.deep.ordered.members(environments)
    })
  })
})
