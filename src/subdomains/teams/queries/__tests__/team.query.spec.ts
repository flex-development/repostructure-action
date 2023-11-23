/**
 * @file Unit Tests - TeamQuery
 * @module teams/queries/tests/unit/TeamQuery
 */

import api from '#fixtures/api.github.json' assert { type: 'json' }
import { get } from '@flex-development/tutils'
import TestSubject from '../team.query'

describe('unit:teams/queries/TeamQuery', () => {
  describe('constructor', () => {
    let subject: TestSubject
    let team: string

    beforeAll(() => {
      subject = new TestSubject({
        org: api.graphql.organization.login,
        team: team = get(api.graphql.organization.teams.nodes, '0.slug')
      })
    })

    it('should set #team', () => {
      expect(subject).to.have.property('team', team)
    })
  })
})
