/**
 * @file Test Utilities - mockGithubAPI
 * @module tests/utils/mockGithubAPI
 */

import nock from '#fixtures/nock'
import { Endpoint } from '#src/enums'
import interceptOptions from './intercept-options'
import reply from './reply'

/**
 * Mocks the GitHub REST API using nock.
 *
 * @see https://github.com/nock/nock
 *
 * @return {void} Nothing when complete
 */
const mockGithubAPI = (): void => {
  for (const endpoint of Object.values(Endpoint)) {
    nock.intercept(...interceptOptions(endpoint)).reply(reply)
  }

  return void 0
}

export default mockGithubAPI
