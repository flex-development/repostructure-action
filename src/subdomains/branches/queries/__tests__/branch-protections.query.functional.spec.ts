/**
 * @file Functional Tests - BranchProtectionsQuery
 * @module branches/queries/tests/functional/BranchProtectionsQuery
 */

import api from '#fixtures/api.github.json' assert { type: 'json' }
import { RepositoryQuery } from '#src/queries'
import TestSubject from '../branch-protections.query'

vi.mock('#src/queries/repository.query', () => ({ default: vi.fn() }))

describe('functional:branches/queries/BranchProtectionsQuery', () => {
  describe('constructor', () => {
    it('should extend RepositoryQuery', () => {
      // Arrange
      const params: Record<'owner' | 'repo', string> = {
        owner: api.graphql.organization.login,
        repo: api.graphql.repository.name
      }

      // Act
      new TestSubject(params)

      // Expect
      expect(RepositoryQuery).toHaveBeenCalledOnce()
      expect(RepositoryQuery).toHaveBeenCalledWith(params)
    })
  })
})
