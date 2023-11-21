/**
 * @file Commands - ManageSecurityCommand
 * @module repostructure/security/commands/ManageSecurityCommand
 */

import type { Nilable } from '@flex-development/tutils'

/**
 * Security management command.
 *
 * @class
 */
class ManageSecurityCommand {
  /**
   * Enable or disable [GitHub Advanced Security][1].
   *
   * [1]: https://docs.github.com/github/getting-started-with-github/learning-about-github/about-github-advanced-security
   *
   * @public
   * @readonly
   * @instance
   * @member {Nilable<boolean>?} advanced_security
   */
  public readonly advanced_security?: Nilable<boolean>

  /**
   * Enable or disable [automated security fixes][1].
   *
   * [1]: https://docs.github.com/articles/configuring-automated-security-fixes
   *
   * @public
   * @readonly
   * @instance
   * @member {Nilable<boolean>?} automated_security_fixes
   */
  public readonly automated_security_fixes?: Nilable<boolean>

  /**
   * Enable or disable [secret scanning][1].
   *
   * [1]: https://docs.github.com/code-security/secret-security/about-secret-scanning
   *
   * @public
   * @readonly
   * @instance
   * @member {Nilable<boolean>?} secret_scanning
   */
  public readonly secret_scanning?: Nilable<boolean>

  /**
   * Enable or disable [secret scanning push protection][1].
   *
   * [1]: https://docs.github.com/code-security/secret-scanning/protecting-pushes-with-secret-scanning
   *
   * @public
   * @readonly
   * @instance
   * @member {Nilable<boolean>?} secret_scanning_push_protection
   */
  public readonly secret_scanning_push_protection?: Nilable<boolean>

  /**
   * Enable or disable [vulnerability alerts][1].
   *
   * [1]: https://docs.github.com/articles/about-security-alerts-for-vulnerable-dependencies
   *
   * @public
   * @readonly
   * @instance
   * @member {Nilable<boolean>?} vulnerability_alerts
   */
  public readonly vulnerability_alerts?: Nilable<boolean>

  /**
   * Enable or disable [private vulnerability reporting][1].
   *
   * [1]: https://docs.github.com/code-security/security-advisories/guidance-on-reporting-and-writing/privately-reporting-a-security-vulnerability
   *
   * @public
   * @readonly
   * @instance
   * @member {Nilable<boolean>?} vulnerability_reporting
   */
  public readonly vulnerability_reporting?: Nilable<boolean>

  /**
   * Create a new security management command.
   *
   * @param {ManageSecurityCommand} params - Command parameters
   */
  constructor(params: ManageSecurityCommand) {
    const {
      advanced_security,
      automated_security_fixes,
      secret_scanning,
      secret_scanning_push_protection,
      vulnerability_alerts,
      vulnerability_reporting
    } = params

    this.advanced_security = advanced_security
    this.automated_security_fixes = automated_security_fixes
    this.secret_scanning = secret_scanning
    this.secret_scanning_push_protection = secret_scanning_push_protection
    this.vulnerability_alerts = vulnerability_alerts
    this.vulnerability_reporting = vulnerability_reporting
  }
}

export default ManageSecurityCommand
