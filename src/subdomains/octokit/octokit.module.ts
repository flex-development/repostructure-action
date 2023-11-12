/**
 * @file OctokitModule
 * @module repostructure/octokit/OctokitModule
 */

import type { Config } from '#src/config'
import * as core from '@actions/core'
import * as github from '@actions/github'
import { Global, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Octokit } from '@octokit/core'
import { paginateGraphql } from '@octokit/plugin-paginate-graphql'

/**
 * Octokit module.
 *
 * @see https://github.com/octokit/octokit.js
 *
 * @class
 */
@Global()
@Module({
  exports: [Octokit],
  providers: [
    {
      inject: [ConfigService],
      provide: Octokit,
      useFactory(config: ConfigService<Config, true>): Octokit {
        return github.getOctokit(config.get('token'), {
          baseUrl: config.get<string>('api'),
          headers: {
            'X-GitHub-Api-Version': '2022-11-28',
            accept: 'application/vnd.github+json'
          },
          log: {
            debug: core.debug.bind(core),
            error: core.error.bind(core),
            info: core.info.bind(core),
            warn: core.warning.bind(core)
          },
          // https://docs.github.com/graphql/overview/schema-previews
          previews: ['bane'],
          request: { fetch }
        }, paginateGraphql)
      }
    }
  ]
})
class OctokitModule {}

export default OctokitModule
