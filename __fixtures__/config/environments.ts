/**
 * @file Test Fixtures - environments
 * @module fixtures/config/environments
 */

import type { Environment } from '#src/interfaces'

export default [
  {
    deployment_branch_policy: null,
    environment_name: 'gpr'
  },
  {
    deployment_branch_policy: null,
    environment_name: 'npm'
  },
  {
    deployment_branch_policy: null,
    environment_name: 'production'
  }
] as Environment[]
