/**
 * @file Test Utilities - interceptOptions
 * @module tests/utils/interceptOptions
 */

import type { Endpoint } from '#src/enums'

/**
 * Converts the given `endpoint` into an array containing a regular expression
 * matching the endpoint and an HTTP verb.
 *
 * @see https://github.com/nock/nock#http-verbs
 *
 * @param {Endpoint} endpoint - API endpoint to evaluate
 * @return {[RegExp, string]} `endpoint` regex and HTTP verb array
 */
const interceptOptions = (endpoint: Endpoint): [RegExp, string] => {
  /**
   * {@linkcode endpoint} as regex pattern.
   *
   * @const {string} pattern
   */
  const pattern: string = endpoint
    .replace(/[A-Z]+? /, '^')
    .replace(/\//g, '\\/')
    .replace(/{(.*?)}/g, '(?<$1>[a-z0-9-%]+?)')

  return [new RegExp(pattern + '$', 'i'), endpoint.replace(/\/.+/, '').trim()]
}

export default interceptOptions
