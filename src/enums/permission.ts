/**
 * @file Enums - Permission
 * @module rice-action/enums/Permission
 */

/**
 * Repository permission types.
 *
 * @see https://docs.github.com/rest/collaborators/collaborators#add-a-repository-collaborator
 * @see https://docs.github.com/rest/teams/teams#add-or-update-team-repository-permissions
 *
 * @enum {Lowercase<string>}
 */
enum Permission {
  ADMIN = 'admin',
  MAINTAIN = 'maintain',
  PULL = 'pull',
  PUSH = 'push',
  TRIAGE = 'triage'
}

export default Permission
