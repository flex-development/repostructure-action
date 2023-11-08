/**
 * @file Fixtures - LABELS
 * @module fixtures/labels
 */

import type { Label } from '#src/labels'

/**
 * Repository labels.
 *
 * @const {ReadonlyArray<Label>} LABELS
 */
const LABELS: readonly Label[] = Object.freeze([
  {
    color: 'fbca04',
    description: 'contains changes that require major version bump',
    id: 'LA_kwDOJGP3088AAAABN_3hjg',
    name: 'flag:breaking-change'
  },
  {
    color: 'fbca04',
    description: 'issue, pull request, or discussion already exists',
    id: 'LA_kwDOJGP3088AAAABN_3hlg',
    name: 'flag:duplicate'
  },
  {
    color: 'fbca04',
    description: 'discussion required before implementation',
    id: 'LA_kwDOJGP3088AAAABN_3hmw',
    name: 'flag:needs-discussion'
  },
  {
    color: 'fbca04',
    description: 'missing documentation or needs existing documentation update',
    id: 'LA_kwDOJGP3088AAAABN_3hoQ',
    name: 'flag:needs-docs'
  },
  {
    color: 'fbca04',
    description: 'code improvements required before being merged',
    id: 'LA_kwDOJGP3088AAAABN_3hqQ',
    name: 'flag:needs-refactor'
  },
  {
    color: '74cefc',
    description: 'github action',
    id: 'LA_kwDOJGP3088AAAABOBL-2w',
    name: 'scope:action'
  },
  {
    color: '74cefc',
    description: 'dependency updates',
    id: 'LA_kwDOJGP3088AAAABN_3ouw',
    name: 'scope:dependencies'
  },
  {
    color: '74cefc',
    description: 'action release',
    id: 'LA_kwDOJGP3088AAAABN_3htg',
    name: 'scope:release'
  },
  {
    color: '74cefc',
    description: 'testing',
    id: 'LA_kwDOJGP3088AAAABN_3oqw',
    name: 'scope:tests'
  },
  {
    color: 'e7034b',
    description: 'needs clarification or more information from author',
    id: 'LA_kwDOJGP3088AAAABN_3orw',
    name: 'status:awaiting-answers'
  },
  {
    color: 'e7034b',
    description: 'blocked by other work tracked in different issue',
    id: 'LA_kwDOJGP3088AAAABN_3hxQ',
    name: 'status:blocked'
  },
  {
    color: 'e7034b',
    description: 'bug report cannot be reproduced',
    id: 'LA_kwDOJGP3088AAAABN_3hyA',
    name: 'status:cannot-reproduce'
  },
  {
    color: 'e7034b',
    description: 'fixed, but not released',
    id: 'LA_kwDOJGP3088AAAABN_3h1g',
    name: 'status:fixed'
  },
  {
    color: 'e7034b',
    description: 'extra attention is needed',
    id: 'LA_kwDOJGP3088AAAABN_3h4w',
    name: 'status:help-wanted'
  },
  {
    color: 'e7034b',
    description: 'changes that won\'t be implemented',
    id: 'LA_kwDOJGP3088AAAABN_3h-A',
    name: 'status:icebox'
  },
  {
    color: 'e7034b',
    description: 'no action to be taken or missing information',
    id: 'LA_kwDOJGP3088AAAABN_3h_w',
    name: 'status:invalid'
  },
  {
    color: 'e7034b',
    description: 'merged, but not released',
    id: 'LA_kwDOJGP3088AAAABN_3osw',
    name: 'status:merged'
  },
  {
    color: 'e7034b',
    description: 'needs further assessment',
    id: 'LA_kwDOJGP3088AAAABN_3iDA',
    name: 'status:needs-triage'
  },
  {
    color: 'e7034b',
    description: 'merged and prereleased',
    id: 'LA_kwDOJGP3088AAAABN_3orA',
    name: 'status:prereleased'
  },
  {
    color: 'e7034b',
    description: 'merged and released',
    id: 'LA_kwDOJGP3088AAAABN_3iEw',
    name: 'status:released'
  },
  {
    color: 'e7034b',
    description: 'superseded by different issue, pull request, or discussion',
    id: 'LA_kwDOJGP3088AAAABN_3iHQ',
    name: 'status:stale'
  },
  {
    color: 'e7034b',
    description: 'bug confirmed',
    id: 'LA_kwDOJGP3088AAAABN_3ouA',
    name: 'status:triaged'
  },
  {
    color: 'e7034b',
    description: 'work in progress',
    id: 'LA_kwDOJGP3088AAAABN_3iKg',
    name: 'status:wip'
  },
  {
    color: '0052cc',
    description: 'changes to the build system or external dependencies',
    id: 'LA_kwDOJGP3088AAAABN_3iNw',
    name: 'type:build'
  },
  {
    color: '0052cc',
    description: 'housekeeping / changes that don\'t impact external users',
    id: 'LA_kwDOJGP3088AAAABN_3iPQ',
    name: 'type:chore'
  },
  {
    color: '0052cc',
    description: 'ci/cd configuration',
    id: 'LA_kwDOJGP3088AAAABN_3orQ',
    name: 'type:ci'
  },
  {
    color: '0052cc',
    description: 'documentation improvements',
    id: 'LA_kwDOJGP3088AAAABN_3iUQ',
    name: 'type:docs'
  },
  {
    color: '0052cc',
    description: 'new features and improvements',
    id: 'LA_kwDOJGP3088AAAABN_3iWQ',
    name: 'type:feat'
  },
  {
    color: '0052cc',
    description: 'bug reports and fixes',
    id: 'LA_kwDOJGP3088AAAABN_3iXA',
    name: 'type:fix'
  },
  {
    color: '0052cc',
    description: 'performance updates',
    id: 'LA_kwDOJGP3088AAAABN_3iYg',
    name: 'type:perf'
  },
  {
    color: '0052cc',
    description: 'questions',
    id: 'LA_kwDOJGP3088AAAABN_3iZw',
    name: 'type:question'
  },
  {
    color: '0052cc',
    description: 'code improvements',
    id: 'LA_kwDOJGP3088AAAABN_3iaQ',
    name: 'type:refactor'
  },
  {
    color: '0052cc',
    description: 'project tasks',
    id: 'LA_kwDOJGP3088AAAABN_3org',
    name: 'type:task'
  }
])

export default LABELS
