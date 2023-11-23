/**
 * @file Unit Tests - TeamsQuery
 * @module teams/queries/tests/unit/TeamsQuery
 */

import api from '#fixtures/api.github.json' assert { type: 'json' }
import { select } from '@flex-development/tutils'
import TestSubject from '../teams.query'

describe('unit:teams/queries/TeamsQuery', () => {
  describe('constructor', () => {
    let subject: TestSubject
    let teams: string[]

    beforeAll(() => {
      subject = new TestSubject({
        org: api.graphql.organization.login,
        teams: teams = select(api.graphql.organization.teams.nodes, null, n => {
          return n.slug
        })
      })
    })

    it('should set #teams', () => {
      expect(subject).to.have.deep.property('teams', teams)
    })
  })
})
