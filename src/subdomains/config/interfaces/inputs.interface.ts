/**
 * @file Interfaces - Inputs
 * @module repostructure/config/interfaces/Inputs
 */

/**
 * Action inputs.
 *
 * @see https://docs.github.com/actions/learn-github-actions/contexts#github-context
 */
interface Inputs {
  /**
   * Base URL of GitHub API.
   *
   * @default github.api_url
   */
  api: string

  /**
   * Infrastructure file location relative to {@linkcode workspace}.
   *
   * @default '.github/infrastructure.yml'
   */
  config: string

  /**
   * Personal access token (PAT) used to authenticate GitHub API requests.
   *
   * @default github.token
   */
  token: string

  /**
   * Absolute path to current working directory.
   *
   * @default github.workspace
   */
  workspace: string
}

export type { Inputs as default }
