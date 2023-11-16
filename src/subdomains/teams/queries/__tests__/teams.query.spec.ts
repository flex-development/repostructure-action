/**
 * @file Unit Tests - TeamsQuery
 * @module teams/queries/tests/unit/TeamsQuery
 */

import data from '#fixtures/api.github.com/graphql.json' assert { type: 'json' }
import { select } from '@flex-development/tutils'
import TestSubject from '../teams.query'

describe('unit:teams/queries/TeamsQuery', () => {
  describe('constructor', () => {
    let org: string
    let subject: TestSubject
    let teams: string[]

    beforeAll(() => {
      org = data.data.organization.login
      teams = select(data.data.organization.teams.nodes, null, n => n.slug)

      subject = new TestSubject({ org, teams })
    })

    it('should set #org', () => {
      expect(subject).to.have.property('org', org)
    })

    it('should set #teams', () => {
      expect(subject).to.have.deep.property('teams', teams)
    })
  })
})
