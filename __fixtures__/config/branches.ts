/**
 * @file Test Fixtures - branches
 * @module fixtures/config/branches
 */

import type { Branch } from '#src/interfaces'

export default [
  {
    name: 'main',
    protection: {
      allow_deletions: false,
      allow_force_pushes: true,
      allow_fork_syncing: false,
      block_creations: false,
      enforce_admins: true,
      lock_branch: false,
      required_conversation_resolution: true,
      required_linear_history: true,
      required_pull_request_reviews: {
        bypass_pull_request_allowances: {},
        dismiss_stale_reviews: true,
        dismissal_restrictions: {},
        require_code_owner_reviews: false,
        require_last_push_approval: false,
        required_approving_review_count: 1
      },
      required_status_checks: {
        checks: [
          { context: 'DCO' },
          { context: 'add-to-project' },
          { context: 'auto-merge' },
          { context: 'build' },
          { context: 'commitlint' },
          { context: 'dependabot-auto' },
          { context: 'format' },
          { context: 'gitguardian' },
          { context: 'lint' },
          { context: 'spelling' },
          { context: 'test (16)' },
          { context: 'test (18)' },
          { context: 'test (19)' },
          { context: 'typescript (5.1.0-dev.20230301)' },
          { context: 'typescript (latest)' },
          { context: 'typescript (~4.9.0)' }
        ],
        strict: true
      },
      restrictions: null
    }
  }
] as Branch[]
