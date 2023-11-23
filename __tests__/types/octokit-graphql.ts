/**
 * @file Test Types - OctokitGraphql
 * @module tests/types/OctokitGraphql
 */

import type {
  graphql
} from 'msw'

/**
 * GitHub GraphQL API request interceptor.
 */
type OctokitGraphql = ReturnType<typeof graphql['link']>

export type { OctokitGraphql as default }
