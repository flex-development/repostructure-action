/**
 * @file Enums - SquashTitle
 * @module repostructure/pull-requests/enums/SquashTitle
 */

/**
 * Default values for squash commit titles.
 *
 * @enum {Uppercase<string>}
 */
enum SquashTitle {
  /**
   * Default to commit title (if only one commit) or pull request title (if more
   * than one commit).
   */
  COMMIT_OR_PR_TITLE = 'COMMIT_OR_PR_TITLE',

  /**
   * Default to pull request title.
   */
  PR_TITLE = 'PR_TITLE'
}

export default SquashTitle
