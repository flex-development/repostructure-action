/**
 * @file Configuration - commitlint
 * @module config/commitlint
 * @see https://commitlint.js.org
 */

import { RuleConfigSeverity, type UserConfig } from '@commitlint/types'
import { scopes } from '@flex-development/commitlint-config'

/**
 * `commitlint` configuration object.
 *
 * @const {UserConfig} config
 */
const config: UserConfig = {
  extends: ['@flex-development'],
  rules: {
    'scope-enum': [
      RuleConfigSeverity.Error,
      'always',
      scopes([
        'action',
        'apps',
        'branches',
        'chore',
        'commands',
        'environments',
        'inputs',
        'labels',
        'octokit',
        'pull-requests',
        'queries',
        'runner',
        'security',
        'teams',
        'users'
      ])
    ],
    'scope-max-length': [RuleConfigSeverity.Disabled]
  }
}

export default config
