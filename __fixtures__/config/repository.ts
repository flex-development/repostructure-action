/**
 * @file Test Fixtures - repository
 * @module fixtures/config/repository
 */

import type { Repository } from '#src/interfaces'
import topics from './topics'

export default {
  allow_auto_merge: true,
  allow_merge_commit: false,
  allow_rebase_merge: true,
  allow_squash_merge: true,
  allow_update_branch: true,
  archived: false,
  automated_security_fixes: true,
  default_branch: 'main',
  delete_branch_on_merge: false,
  description: 'Repository infrastructure as code for GitHub Actions',
  has_issues: true,
  has_projects: true,
  has_wiki: false,
  homepage: 'https://github.com/flex-development/rice-action',
  is_template: false,
  private: false,
  security_and_analysis: {
    advanced_security: { status: 'disabled' },
    secret_scanning: { status: 'enabled' },
    secret_scanning_push_protection: { status: 'disabled' }
  },
  squash_merge_commit_message: 'BLANK',
  squash_merge_commit_title: 'PR_TITLE',
  topics,
  visibility: 'public',
  vulnerability_alerts: true,
  web_commit_signoff_required: true
} as Repository
