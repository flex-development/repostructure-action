/**
 * @file Test Utilities - reply
 * @module tests/utils/reply
 */

import { Endpoint } from '#src/enums'
import type { Environment, Label } from '#src/interfaces'
import github from '@actions/github'
import pathe from '@flex-development/pathe'
import { isString, type ObjectPlain } from '@flex-development/tutils'
import type nock from 'nock'
import fs from 'node:fs'
import intercept from './intercept-options'

/**
 * Mocks an HTTP response.
 *
 * @this {nock.ReplyFnContext}
 *
 * @param {nock.ReplyFnContext} this - Reply function context
 * @param {string} uri - Request path
 * @param {ObjectPlain | string} body - Request body
 * @return {ReadonlyArray<[nock.StatusCode, nock.ReplyBody]>} Array containing
 * response status code and body
 * @throws {Error}
 */
function reply(
  this: nock.ReplyFnContext,
  uri: string,
  body: ObjectPlain | string
): readonly [nock.StatusCode, nock.ReplyBody] {
  if (isString(body)) body = {}

  /**
   * Returns the path to a fixture file.
   *
   * @param {string} uri - Request path
   * @return {string} Absolute path to fixture file
   */
  const fixturePath = (uri: string): string => {
    /**
     * Index file check.
     *
     * @const {boolean} index
     */
    const index: boolean = intercept(Endpoint.REPOSITORY)[0].test(uri)

    /**
     * Response fixtures directory.
     *
     * @const {string} dir
     */
    const dir: string = `__fixtures__/${github.context.apiUrl.slice(8)}`

    return pathe.join(dir, uri + (index ? '/index.json' : '.json'))
  }

  /**
   * Checks if {@linkcode uri} is a match for the given `endpoint`.
   *
   * @param {Endpoint} endpoint - Endpoint to evaluate
   * @return {boolean} `true` if {@linkcode uri} matches `endpoint`
   */
  const isRoute = (endpoint: Endpoint): boolean => {
    const [regex, method] = intercept(endpoint)
    return method === this.req.method && regex.test(uri)
  }

  /**
   * Absolute path to response fixture file.
   *
   * @const {string} fixture
   */
  const path: string = fixturePath(uri)

  /**
   * Response data.
   *
   * @var {nock.ReplyBody} content
   */
  let data: nock.ReplyBody

  /**
   * Response status.
   *
   * @var {number} status
   */
  let status: number

  try {
    // get response data and status
    switch (true) {
      case isRoute(Endpoint.AUTOMATED_SECURITY_FIXES_DISABLE):
      case isRoute(Endpoint.AUTOMATED_SECURITY_FIXES_ENABLE):
      case isRoute(Endpoint.TEAM_REPO):
      case isRoute(Endpoint.VULNERABILITY_ALERTS_DISABLE):
      case isRoute(Endpoint.VULNERABILITY_ALERTS_ENABLE):
      case this.req.method.toLowerCase() === 'delete':
        data = ''
        status = 204
        break
      case isRoute(Endpoint.ENVIRONMENT_UPSERT):
        // get deployment environments data
        const { environments } = JSON.parse(
          fs.readFileSync(path.replace(/\/[\d%.a-z-]+$/i, '.json'), 'utf8')
        ) as { environments: Environment[]; total_count: number }

        /**
         * Deployment environment data to update.
         *
         * @const {Environment | undefined} env
         */
        const env: Environment | undefined = environments.find(({ name }) => {
          return (
            name === decodeURIComponent(uri).replace(/.+environments\//, '')
          )
        })

        data = env ?? { name: (body as Environment).environment_name }
        status = 200
        break
      case isRoute(Endpoint.LABEL_CREATE):
        data = JSON.parse(fs.readFileSync(path, 'utf8'))
        status = 201

        // return error response if label already exists
        if ((data as Label[]).some(obj => obj.name === (body as Label).name)) {
          return [
            422,
            {
              documentation_url:
                'https://docs.github.com/rest/reference/issues#create-a-label',
              errors: [
                {
                  code: 'already_exists',
                  field: 'name',
                  resource: 'Label'
                }
              ],
              message: 'Validation Failed'
            }
          ]
        }

        break
      case isRoute(Endpoint.LABEL_UPDATE):
        /**
         * Labels data.
         *
         * @const {Label[]} labels
         */
        const labels: Label[] = JSON.parse(
          fs.readFileSync(path.replace(/\/[\d%.a-z-]+$/i, '.json'), 'utf8')
        )

        /**
         * Label data to update.
         *
         * @const {Label | undefined} label
         */
        const label: Label | undefined = labels.find(({ name }) => {
          return name === decodeURIComponent(uri).replace(/.+labels\//, '')
        })

        // return error response if label to update was not found
        if (!label) {
          return [
            404,
            {
              documentation_url:
                'https://docs.github.com/rest/reference/issues#update-a-label',
              message: 'Not Found'
            }
          ]
        }

        data = label
        status = 200
        break
      default:
        data = JSON.parse(fs.readFileSync(path, 'utf8'))
        status = 200
        break
    }

    return [status, data]
  } catch (e: unknown) {
    if ((e as NodeJS.ErrnoException).code === 'ENOENT') {
      status = 404

      return [
        status,
        {
          documentation_url: 'https://docs.github.com/rest',
          message: 'Not Found',
          status
        }
      ]
    }

    throw e
  }
}

export default reply
