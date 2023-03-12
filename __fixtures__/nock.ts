/**
 * @file Test Fixtures - nock
 * @module fixtures/nock
 * @see https://github.com/nock/nock
 */

import github from '@actions/github'
import * as mlly from '@flex-development/mlly'
import dateformat from 'dateformat'
import nock from 'nock'

/**
 * HTTP server mock for {@linkcode github.context.apiUrl}.
 *
 * @const {nock.Scope} nock
 */
export default nock(github.context.apiUrl, { allowUnmocked: false })
  .defaultReplyHeaders({
    'access-control-allow-origin': mlly.PATTERN_CHARACTER,
    'cache-control': 'private, max-age=60, s-maxage=60',
    'content-type': 'application/json; charset=utf-8',
    date: dateformat(new Date(), 'GMT:ddd, dS mmm yyyy h:MM:ss Z'),
    server: 'GitHub.com',
    'x-github-api-version-selected': '2022-11-28',
    'x-github-media-type': 'github.v3; format=json'
  })
  .persist()
