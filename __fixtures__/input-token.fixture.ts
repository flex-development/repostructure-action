/**
 * @file Fixtures - INPUT_TOKEN
 * @module fixtures/input-token
 */

/**
 * Personal access token (PAT) used to authenticate GitHub API requests.
 *
 * @const {string} INPUT_TOKEN
 */
const INPUT_TOKEN: string = import.meta.env.GITHUB_TOKEN

export default INPUT_TOKEN
