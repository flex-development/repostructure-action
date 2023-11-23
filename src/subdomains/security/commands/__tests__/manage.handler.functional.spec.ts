/**
 * @file Functional Tests - ManageSecurityHandler
 * @module security/commands/tests/functional/ManageSecurityHandler
 */

import api from '#fixtures/api.github.json' assert { type: 'json' }
import OctokitProvider from '#fixtures/octokit.provider.fixture'
import type { Config } from '#src/config'
import { Octokit } from '#src/octokit'
import type { Spy } from '#tests/interfaces'
import { ConfigService } from '@nestjs/config'
import { CqrsModule } from '@nestjs/cqrs'
import { Test, type TestingModule } from '@nestjs/testing'
import ManageSecurityCommand from '../manage.command'
import TestSubject from '../manage.handler'

describe('functional:security/commands/ManageSecurityHandler', () => {
  let config: ConfigService<Config, true>
  let octokit: Octokit
  let ref: TestingModule
  let subject: TestSubject

  beforeAll(async () => {
    ref = await (await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        OctokitProvider,
        TestSubject,
        {
          provide: ConfigService,
          useValue: new ConfigService({
            owner: api.graphql.organization.login,
            repo: api.graphql.repository.name
          })
        }
      ]
    }).compile()).init()

    config = ref.get(ConfigService)
    octokit = ref.get(Octokit)
    subject = ref.get(TestSubject)
  })

  describe('#execute', () => {
    let repos: typeof octokit['rest']['repos']
    let repository: { owner: string; repo: string }

    beforeAll(() => {
      repos = octokit.rest.repos

      repository = {
        owner: config.get<string>('owner'),
        repo: config.get<string>('repo')
      }
    })

    it('should manage security and analysis', async () => {
      // Arrange
      const command: ManageSecurityCommand = new ManageSecurityCommand({
        advanced_security: false,
        secret_scanning: true,
        secret_scanning_push_protection: false
      })

      // Act
      vi.spyOn(repos, 'update')
      await subject.execute(command)

      // Expect
      expect(repos.update).toHaveBeenCalledOnce()
      expect(repos.update).toHaveBeenCalledWith({
        ...repository,
        security_and_analysis: {
          advanced_security: { status: 'disabled' },
          secret_scanning: { status: 'enabled' },
          secret_scanning_push_protection: { status: 'disabled' }
        }
      })
    })

    describe.each<[
      param:
        | 'automated_security_fixes'
        | 'vulnerability_alerts'
        | 'vulnerability_reporting',
      fn:
        | 'AutomatedSecurityFixes'
        | 'PrivateVulnerabilityReporting'
        | 'VulnerabilityAlerts',
      description: string
    ]>([
      [
        'automated_security_fixes',
        'AutomatedSecurityFixes',
        'automated security fixes'
      ],
      [
        'vulnerability_alerts',
        'VulnerabilityAlerts',
        'vulnerability alerts'
      ],
      [
        'vulnerability_reporting',
        'PrivateVulnerabilityReporting',
        'private vulnerability reporting'
      ]
    ])('%s', (param, fn, description) => {
      let disable: Spy<typeof repos[`disable${typeof fn}`]>
      let enable: Spy<typeof repos[`enable${typeof fn}`]>
      let update: Spy<typeof repos['update']>
      let updates: Required<Parameters<typeof repos['update']>>[0]

      beforeEach(() => {
        disable = vi.spyOn(repos, `disable${fn}`)
        enable = vi.spyOn(repos, `enable${fn}`)
        update = vi.spyOn(repos, 'update')
        updates = { ...repository, security_and_analysis: {} }
      })

      it(`should disable ${description}`, async () => {
        // Arrange
        const command: ManageSecurityCommand = new ManageSecurityCommand({
          [param]: false
        })

        // Act
        await subject.execute(command)

        // Expect
        expect(update).toHaveBeenCalledOnce()
        expect(update).toHaveBeenCalledWith(updates)
        expect(enable).not.toHaveBeenCalled()
        expect(disable).toHaveBeenCalledOnce()
        expect(disable).toHaveBeenCalledWith(repository)
        expect(update).toHaveBeenCalledOnce()
      })

      it(`should enable ${description}`, async () => {
        // Arrange
        const command: ManageSecurityCommand = new ManageSecurityCommand({
          [param]: true
        })

        // Act
        await subject.execute(command)

        // Expect
        expect(update).toHaveBeenCalledOnce()
        expect(update).toHaveBeenCalledWith(updates)
        expect(disable).not.toHaveBeenCalled()
        expect(enable).toHaveBeenCalledOnce()
        expect(enable).toHaveBeenCalledWith(repository)
      })
    })
  })
})
