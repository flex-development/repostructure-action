/**
 * @file Unit Tests - TeamQuery
 * @module teams/queries/tests/unit/TeamQuery
 */

import data from '#fixtures/api.github.com/graphql.json' assert { type: 'json' }
import { get } from '@flex-development/tutils'
import TestSubject from '../team.query'

describe('unit:teams/queries/TeamQuery', () => {
  describe('constructor', () => {
    let org: string
    let subject: TestSubject
    let team: string

    beforeAll(() => {
      subject = new TestSubject({
        org: org = data.data.organization.login,
        team: team = get(data.data.organization.teams.nodes, '0.slug')
      })
    })

    it('should set #org', () => {
      expect(subject).to.have.property('org', org)
    })

    it('should set #team', () => {
      expect(subject).to.have.property('team', team)
    })
  })
})
