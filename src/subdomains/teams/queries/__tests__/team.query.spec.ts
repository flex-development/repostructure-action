/**
 * @file Unit Tests - TeamQuery
 * @module repostructure/teams/queries/tests/unit/TeamQuery
 */

import team from '#fixtures/api.github.com/orgs/flex-development/teams/dependabot-review.json'
import TestSubject from '../team.query'

describe('unit:teams/queries/TeamQuery', () => {
  describe('constructor', () => {
    let subject: TestSubject

    beforeAll(() => {
      subject = new TestSubject({
        org: team.organization.login,
        team: team.slug
      })
    })

    it('should set #org', () => {
      expect(subject).to.have.property('org', team.organization.login)
    })

    it('should set #team', () => {
      expect(subject).to.have.property('team', team.slug)
    })
  })
})
