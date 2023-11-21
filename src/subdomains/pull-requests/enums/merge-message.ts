/**
 * @file Enums - MergeMessage
 * @module repostructure/pull-requests/enums/MergeMessage
 */

/**
 * Default values for merge commit messages.
 *
 * @enum {Uppercase<string>}
 */
enum MergeMessage {
  /**
   * Default to blank commit message.
   */
  BLANK = 'BLANK',

  /**
   * Default to pull request body.
   */
  PR_BODY = 'PR_BODY',

  /**
   * Default to pull request title.
   */
  PR_TITLE = 'PR_TITLE'
}

export default MergeMessage
