/**
 * @file Fixtures - CREATE_LABEL_URL
 * @module fixtures/url-create-label
 */

import pathe from '@flex-development/pathe'
import { join } from '@flex-development/tutils'
import INPUT_API from './input-api.fixture'
import OWNER from './owner.fixture'
import REPO from './repo.fixture'

/**
 * Label creation endpoint.
 *
 * @const {string} CREATE_LABEL_URL
 */
const CREATE_LABEL_URL: string = join([
  INPUT_API,
  'repos',
  OWNER,
  REPO,
  'labels'
], pathe.sep)

export default CREATE_LABEL_URL
