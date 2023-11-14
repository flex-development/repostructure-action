/**
 * @file Functional Tests - EnvironmentsQuery
 * @module repostructure/environments/queries/tests/functional/EnvironmentsQuery
 */

import OWNER from '#fixtures/owner.fixture'
import REPO from '#fixtures/repo.fixture'
import { RepositoryQuery } from '#src/queries'
import TestSubject from '../environments.query'

vi.mock('#src/queries/repository.query', () => ({ default: vi.fn() }))

describe('functional:environments/queries/EnvironmentsQuery', () => {
  describe('constructor', () => {
    it('should extend RepositoryQuery', () => {
      // Arrange
      const params: Record<'owner' | 'repo', string> = {
        owner: OWNER,
        repo: REPO
      }

      // Act
      new TestSubject(params)

      // Expect
      expect(RepositoryQuery).toHaveBeenCalledOnce()
      expect(RepositoryQuery).toHaveBeenCalledWith(params)
    })
  })
})
