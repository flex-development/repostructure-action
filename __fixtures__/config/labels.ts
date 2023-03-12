/**
 * @file Test Fixtures - labels
 * @module fixtures/config/labels
 */

import type { Label } from '#src/interfaces'

export default [
  {
    color: 'fbca04',
    description: 'contains changes that require major version bump',
    name: 'flag:breaking-change'
  },
  {
    color: 'fbca04',
    description: 'issue, pull request, or discussion already exists',
    name: 'flag:duplicate'
  },
  {
    color: 'fbca04',
    description: 'discussion required before implementation',
    name: 'flag:needs-discussion'
  },
  {
    color: 'fbca04',
    description: 'missing documentation or needs existing documentation update',
    name: 'flag:needs-docs'
  },
  {
    color: 'fbca04',
    description: 'code improvements required before being merged',
    name: 'flag:needs-refactor'
  },
  {
    color: '74cefc',
    description: 'github action',
    name: 'scope:action'
  },
  {
    color: '74cefc',
    description: 'dependency updates',
    name: 'scope:dependencies'
  },
  {
    color: '74cefc',
    description: 'action release',
    name: 'scope:release'
  },
  {
    color: '74cefc',
    description: 'testing',
    name: 'scope:tests'
  },
  {
    color: 'e7034b',
    description: 'needs clarification or more information from author',
    name: 'status:awaiting-answers'
  },
  {
    color: 'e7034b',
    description: 'blocked by other work tracked in different issue',
    name: 'status:blocked'
  },
  {
    color: 'e7034b',
    description: 'bug report cannot be reproduced',
    name: 'status:cannot-reproduce'
  },
  {
    color: 'e7034b',
    description: 'fixed, but not released',
    name: 'status:fixed'
  },
  {
    color: 'e7034b',
    description: 'extra attention is needed',
    name: 'status:help-wanted'
  },
  {
    color: 'e7034b',
    description: "changes that won't be implemented",
    name: 'status:icebox'
  },
  {
    color: 'e7034b',
    description: 'no action to be taken or missing information',
    name: 'status:invalid'
  },
  {
    color: 'e7034b',
    description: 'merged, but not released',
    name: 'status:merged'
  },
  {
    color: 'e7034b',
    description: 'needs further assessment',
    name: 'status:needs-triage'
  },
  {
    color: 'e7034b',
    description: 'merged and prereleased',
    name: 'status:prereleased'
  },
  {
    color: 'e7034b',
    description: 'merged and released',
    name: 'status:released'
  },
  {
    color: 'e7034b',
    description: 'superseded by different issue, pull request, or discussion',
    name: 'status:stale'
  },
  {
    color: 'e7034b',
    description: 'bug confirmed',
    name: 'status:triaged'
  },
  {
    color: 'e7034b',
    description: 'work in progress',
    name: 'status:wip'
  },
  {
    color: '0052cc',
    description: 'changes to the build system or external dependencies',
    name: 'type:build'
  },
  {
    color: '0052cc',
    description: "housekeeping / changes that don't impact external users",
    name: 'type:chore'
  },
  {
    color: '0052cc',
    description: 'ci/cd configuration',
    name: 'type:ci'
  },
  {
    color: '0052cc',
    description: 'documentation improvements',
    name: 'type:docs'
  },
  {
    color: '0052cc',
    description: 'new features and improvements',
    name: 'type:feat'
  },
  {
    color: '0052cc',
    description: 'bug reports and fixes',
    name: 'type:fix'
  },
  {
    color: '0052cc',
    description: 'performance updates',
    name: 'type:perf'
  },
  {
    color: '0052cc',
    description: 'questions',
    name: 'type:question'
  },
  {
    color: '0052cc',
    description: 'code improvements',
    name: 'type:refactor'
  },
  {
    color: '0052cc',
    description: 'project tasks',
    name: 'type:task'
  }
] as Label[]
