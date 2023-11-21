/**
 * @file Functional Tests - Octokit
 * @module octokit/models/tests/functional/Octokit
 */

import * as graphql from '@octokit/plugin-paginate-graphql'
import * as rest from '@octokit/plugin-rest-endpoint-methods'
import TestSubject from '../octokit.model'

vi.mock('@octokit/plugin-paginate-graphql', async og => ({
  paginateGraphql: (await og<typeof graphql>()).paginateGraphql
}))

vi.mock('@octokit/plugin-rest-endpoint-methods', async og => ({
  restEndpointMethods: (await og<typeof rest>()).restEndpointMethods
}))

describe('functional:octokit/models/Octokit', () => {
  describe('constructor', () => {
    let subject: TestSubject

    beforeEach(() => {
      vi.spyOn(graphql, 'paginateGraphql')
      vi.spyOn(rest, 'restEndpointMethods')

      subject = new TestSubject()
    })

    it('should initialize #graphql', () => {
      expect(graphql.paginateGraphql).toHaveBeenCalledOnce()
      expect(graphql.paginateGraphql).toHaveBeenCalledWith(subject)
    })

    it('should initialize #rest', () => {
      expect(rest.restEndpointMethods).toHaveBeenCalledOnce()
      expect(rest.restEndpointMethods).toHaveBeenCalledWith(subject)
    })
  })
})
