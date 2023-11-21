/**
 * @file Unit Tests - ManageSecurityCommand
 * @module security/commands/tests/unit/ManageSecurityCommand
 */

import TestSubject from '../manage.command'

describe('unit:security/commands/ManageSecurityCommand', () => {
  describe('constructor', () => {
    let advanced_security: boolean
    let automated_security_fixes: boolean
    let push_protection: boolean
    let secret_scanning: boolean
    let subject: TestSubject
    let vulnerability_alerts: boolean
    let vulnerability_reporting: boolean

    beforeAll(() => {
      advanced_security = false
      automated_security_fixes = true
      secret_scanning = true
      push_protection = false
      vulnerability_alerts = true
      vulnerability_reporting = true

      subject = new TestSubject({
        advanced_security,
        automated_security_fixes,
        secret_scanning,
        secret_scanning_push_protection: push_protection,
        vulnerability_alerts,
        vulnerability_reporting
      })
    })

    it('should set #advanced_security', () => {
      expect(subject).to.have.property('advanced_security', advanced_security)
    })

    it('should set #automated_security_fixes', () => {
      expect(subject)
        .to.have.property('automated_security_fixes', automated_security_fixes)
    })

    it('should set #secret_scanning', () => {
      expect(subject).to.have.property('secret_scanning', secret_scanning)
    })

    it('should set #secret_scanning_push_protection', () => {
      expect(subject)
        .to.have.property('secret_scanning_push_protection', push_protection)
    })

    it('should set #vulnerability_alerts', () => {
      expect(subject)
        .to.have.property('vulnerability_alerts', vulnerability_alerts)
    })

    it('should set #vulnerability_reporting', () => {
      expect(subject)
        .to.have.property('vulnerability_reporting', vulnerability_reporting)
    })
  })
})
