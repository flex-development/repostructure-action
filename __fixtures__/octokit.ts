/**
 * @file Test Fixtures - Octokit Client
 * @module fixtures/octokit
 * @see https://github.com/actions/toolkit/tree/main/packages/github
 * @see https://octokit.github.io/rest.js
 */

import github from '@actions/github'

export default github.getOctokit(process.env.GITHUB_TOKEN!)
