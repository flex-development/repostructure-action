/**
 * @file Fixtures - OctokitProvider
 * @module fixtures/OctokitProvider
 */

import * as github from '@actions/github'
import type { ValueProvider } from '@nestjs/common'
import { Octokit } from '@octokit/core'
import { paginateGraphql } from '@octokit/plugin-paginate-graphql'
import INPUT_API from './input-api.fixture'
import INPUT_TOKEN from './input-token.fixture'

/**
 * Octokit provider.
 *
 * @const {ValueProvider<Octokit>} OctokitProvider
 */
const OctokitProvider: ValueProvider<Octokit> = {
  provide: Octokit,
  useValue: github.getOctokit(INPUT_TOKEN, {
    baseUrl: INPUT_API,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
      accept: 'application/vnd.github+json'
    },
    previews: ['bane'],
    request: {
      fetch: async (info: RequestInfo, opts: RequestInit) => fetch(info, opts)
    }
  }, paginateGraphql)
}

export default OctokitProvider
