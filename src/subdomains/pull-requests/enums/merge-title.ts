/**
 * @file Enums - MergeTitle
 * @module repostructure/pull-requests/enums/MergeTitle
 */

/**
 * Default values for merge commit titles.
 *
 * @enum {Uppercase<string>}
 */
enum MergeTitle {
  /**
   * Default to classic title.
   *
   * @example
   *  'Merge pull request #123 from branch-name'
   */
  MERGE_MESSAGE = 'MERGE_MESSAGE',

  /**
   * Default to pull request title.
   */
  PR_TITLE = 'PR_TITLE'
}

export default MergeTitle
