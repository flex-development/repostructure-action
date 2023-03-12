/**
 * @file Enums - Endpoint
 * @module rice-action/enums/Endpoint
 */

import type { Endpoints } from '@octokit/types'

/**
 * GitHub REST API endpoints.
 *
 * @see {@linkcode Endpoints}
 * @see https://docs.github.com/rest
 *
 * @enum {Endpoints}
 */
enum Endpoint {
  /**
   * Disable automated security fixes.
   *
   * @see https://docs.github.com/rest/repos#disable-automated-security-fixes
   */
  AUTOMATED_SECURITY_FIXES_DISABLE = 'DELETE /repos/{owner}/{repo}/automated-security-fixes',

  /**
   * Enable automated security fixes.
   *
   * @see https://docs.github.com/rest/repos#enable-automated-security-fixes
   */
  AUTOMATED_SECURITY_FIXES_ENABLE = 'PUT /repos/{owner}/{repo}/automated-security-fixes',

  /**
   * Update branch protection.
   *
   * @see https://docs.github.com/rest/branches/branch-protection#update-branch-protection
   */
  BRANCH_PROTECTION = 'PUT /repos/{owner}/{repo}/branches/{branch}/protection',

  /**
   * List environments.
   *
   * @see https://docs.github.com/rest/deployments/environments#list-environments
   */
  ENVIRONMENTS = 'GET /repos/{owner}/{repo}/environments',

  /**
   * Delete an environment.
   *
   * @see https://docs.github.com/rest/deployments/environments#delete-an-environment
   */
  ENVIRONMENT_DELETE = 'DELETE /repos/{owner}/{repo}/environments/{environment_name}',

  /**
   * Create or update an environment.
   *
   * @see https://docs.github.com/rest/deployments/environments#create-or-update-an-environment
   */
  ENVIRONMENT_UPSERT = 'PUT /repos/{owner}/{repo}/environments/{environment_name}',

  /**
   * List labels for a repository.
   *
   * @see https://docs.github.com/rest/issues/labels#list-labels-for-a-repository
   */
  LABELS = 'GET /repos/{owner}/{repo}/labels',

  /**
   * Create a label.
   *
   * @see https://docs.github.com/rest/issues/labels#create-a-label
   */
  LABEL_CREATE = 'POST /repos/{owner}/{repo}/labels',

  /**
   * Delete a label.
   *
   * @see https://docs.github.com/rest/issues/labels#delete-a-label
   */
  LABEL_DELETE = 'DELETE /repos/{owner}/{repo}/labels/{name}',

  /**
   * Update a label.
   *
   * @see https://docs.github.com/rest/issues/labels#update-a-label
   */
  LABEL_UPDATE = 'PATCH /repos/{owner}/{repo}/labels/{name}',

  /**
   * Update a repository.
   *
   * @see https://docs.github.com/rest/repos/repos#update-a-repository
   */
  REPOSITORY = 'PATCH /repos/{owner}/{repo}',

  /**
   * Add or update team repository permissions.
   *
   * @see https://docs.github.com/rest/teams/teams#add-or-update-team-repository-permissions
   */
  TEAM_REPO = 'PUT /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}',

  /**
   * Replace all repository topics.
   *
   * @see https://docs.github.com/rest/repos/repos#replace-all-repository-topics
   */
  TOPICS = 'PUT /repos/{owner}/{repo}/topics',

  /**
   * Disable dependency alerts and the dependency graph.
   *
   * @see https://docs.github.com/rest/repos#disable-vulnerability-alerts
   */
  VULNERABILITY_ALERTS_DISABLE = 'DELETE /repos/{owner}/{repo}/vulnerability-alerts',

  /**
   * Enable dependency alerts and the dependency graph.
   *
   * @see https://docs.github.com/rest/repos#enable-vulnerability-alerts
   */
  VULNERABILITY_ALERTS_ENABLE = 'PUT /repos/{owner}/{repo}/vulnerability-alerts'
}

export default Endpoint
