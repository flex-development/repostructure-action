/**
 * @file Test Utilities - resource
 * @module tests/utils/resource
 */

import api from '#fixtures/api.github.json' assert { type: 'json' }
import pathe from '@flex-development/pathe'
import { hasOwn, isString, isUndefined } from '@flex-development/tutils'
import jp from '@sagold/json-pointer'
import { HttpResponse, type StrictResponse } from 'msw'

/**
 * Get a mock REST API resource.
 *
 * @template P - Mock path type
 * @template T - Resource type
 *
 * @param {URL | string} pointer - JSON pointer
 * @return {StrictResponse<T | { message: string }>} HTTP response
 */
const resource = <T extends Record<string, any>>(
  pointer: URL | string
): StrictResponse<T | { message: string }> => {
  /**
   * Mock REST API resource.
   *
   * @var {unknown} resource
   */
  let resource: unknown = jp.get(
    api,
    isString(pointer) ? pointer : pointer.pathname
  )

  // mock resource root
  if (hasOwn(resource, '')) resource = jp.get(resource, pathe.sep)

  // return error response if resource was not found
  if (isUndefined(resource)) {
    return HttpResponse.json({ message: 'Not Found' }, {
      status: 404,
      statusText: 'Not Found'
    })
  }

  return HttpResponse.json(<T>resource)
}

export default resource
