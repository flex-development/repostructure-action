/**
 * @file Enums - SquashMessage
 * @module repostructure/pull-requests/enums/SquashMessage
 */

/**
 * Default values for squash commit messages.
 *
 * @enum {Uppercase<string>}
 */
enum SquashMessage {
  /**
   * Default to blank commit message.
   */
  BLANK = 'BLANK',

  /**
   * Default to branch's commit messages.
   */
  COMMIT_MESSAGES = 'COMMIT_MESSAGES',

  /**
   * Default to pull request body.
   */
  PR_BODY = 'PR_BODY'
}

export default SquashMessage
