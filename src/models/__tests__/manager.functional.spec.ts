/**
 * @file Functional Tests - Manager
 * @module rice-action/models/tests/functional/Manager
 */

import branches from '#fixtures/config/branches'
import environments from '#fixtures/config/environments'
import labels from '#fixtures/config/labels'
import repository from '#fixtures/config/repository'
import teams from '#fixtures/config/teams'
import topics from '#fixtures/config/topics'
import octokit from '#fixtures/octokit'
import { Endpoint } from '#src/enums'
import type { Label, Repository } from '#src/interfaces'
import type { Spy } from '#tests/interfaces'
import mockGithubAPI from '#tests/utils/mock-github-api'
import github from '@actions/github'
import { omit } from 'radash'
import TestSubject from '../manager'

describe('functional:models/Manager', () => {
  let request: Spy<(typeof subject)['request']>
  let subject: TestSubject

  beforeAll(() => {
    subject = new TestSubject(octokit, github.context)
    // @ts-expect-error ts(2345)
    request = vi.spyOn(subject, 'request') as unknown as typeof request
    // intercept github api endpoints
    mockGithubAPI()
  })

  describe('#updateBranches', () => {
    it('should update branch protection settings', async () => {
      // Arrange
      const endpoint: Endpoint = Endpoint.BRANCH_PROTECTION

      // Act
      await subject.updateBranches(branches)

      // Expect
      expect(request).toHaveBeenCalledTimes(branches.length)
      expect(request).toHaveBeenCalledWith(endpoint, expect.any(Object))
    })
  })

  describe('#updateEnvironments', () => {
    it('should delete stale environments', async () => {
      // Act
      await subject.updateEnvironments(environments)

      // Expect
      expect(request).toHaveBeenCalledWith(Endpoint.ENVIRONMENT_DELETE, {
        environment_name: expect.any(String)
      })
    })

    it('should upsert environments', async () => {
      // Arrange
      const endpoint: Endpoint = Endpoint.ENVIRONMENT_UPSERT

      // Act
      await subject.updateEnvironments(environments)

      // Expect
      expect(request).toHaveBeenCalledTimes(environments.length + 1)
      expect(request).toHaveBeenCalledWith(endpoint, environments[0])
    })
  })

  describe('#updateLabels', () => {
    it('should delete stale labels', async () => {
      // Act
      await subject.updateLabels(labels)

      // Expect
      expect(request).toHaveBeenCalledWith(Endpoint.LABEL_DELETE, {
        name: expect.any(String)
      })
    })

    it('should upsert labels', async () => {
      // Arrange
      const endpoint1: Endpoint = Endpoint.LABEL_CREATE
      const endpoint2: Endpoint = Endpoint.LABEL_UPDATE
      const new_label: Label = { color: '74cefc', name: 'scope:utils' }

      // Act
      await subject.updateLabels([...labels, new_label])

      // Expect
      expect(request).toHaveBeenCalledWith(endpoint1, expect.any(Object))
      expect(request).toHaveBeenCalledWith(endpoint2, expect.any(Object))
    })
  })

  describe('#updateRepository', () => {
    it('should update general settings', async () => {
      // Arrange
      const this_repository: Repository = omit(repository, [
        'automated_security_fixes',
        'topics',
        'vulnerability_alerts'
      ])

      // Act
      await subject.updateRepository(this_repository)

      // Expect
      expect(request).toHaveBeenCalledWith(Endpoint.REPOSITORY, {
        ...this_repository,
        name: github.context.repo.repo
      })
    })

    describe('automated_security_fixes', () => {
      it('should disable automated security fixes', async () => {
        // Arrange
        const endpoint: Endpoint = Endpoint.AUTOMATED_SECURITY_FIXES_DISABLE

        // Act
        await subject.updateRepository({ automated_security_fixes: false })

        // Expect
        expect(request).toHaveBeenCalledWith(endpoint)
      })

      it('should enable automated security fixes', async () => {
        // Arrange
        const endpoint: Endpoint = Endpoint.AUTOMATED_SECURITY_FIXES_ENABLE

        // Act
        await subject.updateRepository({ automated_security_fixes: true })

        // Expect
        expect(request).toHaveBeenCalledWith(endpoint)
      })
    })

    describe('topics', () => {
      it('should replace repository topics', async () => {
        // Act
        await subject.updateRepository({ topics })

        // Expect
        expect(request).toHaveBeenCalledWith(Endpoint.TOPICS, { names: topics })
      })
    })

    describe('vulnerability_alerts', () => {
      it('should disable vulnerability alerts', async () => {
        // Arrange
        const endpoint: Endpoint = Endpoint.VULNERABILITY_ALERTS_DISABLE

        // Act
        await subject.updateRepository({ vulnerability_alerts: false })

        // Expect
        expect(request).toHaveBeenCalledWith(endpoint)
      })

      it('should enable vulnerability alerts', async () => {
        // Arrange
        const endpoint: Endpoint = Endpoint.VULNERABILITY_ALERTS_ENABLE

        // Act
        await subject.updateRepository({ vulnerability_alerts: true })

        // Expect
        expect(request).toHaveBeenCalledWith(endpoint)
      })
    })
  })

  describe('#updateTeams', () => {
    it('should update team repository permissions', async () => {
      // Act
      await subject.updateTeams(teams)

      // Expect
      expect(request).toHaveBeenCalledTimes(teams.length)
      expect(request).toHaveBeenCalledWith(Endpoint.TEAM_REPO, {
        ...teams[0],
        org: github.context.repo.owner
      })
    })
  })
})
