/**
 * @file Models - Manager
 * @module rice-action/models/manager
 */

import { Endpoint } from '#src/enums'
import type {
  Branch,
  Environment,
  Label,
  LabelResponse,
  Repository,
  Team
} from '#src/interfaces'
import type { RequestOptions, Response } from '#src/types'
import type { Context } from '@actions/github/lib/context'
import type { GitHub } from '@actions/github/lib/utils'
import { diff, pick } from 'radash'

/**
 * Repository infrastructure manager model.
 *
 * @class
 */
class Manager {
  /**
   * GitHub context.
   *
   * @see https://docs.github.com/actions/learn-github-actions/contexts#github-context
   *
   * @protected
   * @readonly
   * @instance
   * @member {Pick<Context, 'apiUrl' | 'repo'>} context
   */
  protected readonly context: Pick<Context, 'apiUrl' | 'repo'>

  /**
   * Authenticated Octokit client.
   *
   * @see https://github.com/actions/toolkit/tree/main/packages/github
   * @see https://octokit.github.io/rest.js
   *
   * @protected
   * @readonly
   * @instance
   * @member {InstanceType<typeof GitHub>} octokit
   */
  protected readonly octokit: InstanceType<typeof GitHub>

  /**
   * Creates a repository infrastructure manager instance.
   *
   * @param {InstanceType<typeof GitHub>} octokit - Octokit client
   * @param {Pick<Context, 'apiUrl' | 'repo'>} context - GitHub context
   */
  constructor(
    octokit: InstanceType<typeof GitHub>,
    context: Pick<Context, 'apiUrl' | 'repo'>
  ) {
    this.octokit = octokit
    this.context = context
  }

  /**
   * Makes a request to the GitHub API.
   *
   * @protected
   * @async
   *
   * @template Route - API endpoint type
   *
   * @param {Route} route - API endpoint to request
   * @param {Partial<RequestOptions<Route>>} [options={}] - Request options
   * @return {Promise<Response<Route>>} API response
   */
  protected async request<Route extends Endpoint>(
    route: Route,
    options: RequestOptions<Route> = {} as RequestOptions<Route>
  ): Promise<Response<Route>> {
    return this.octokit.request<Endpoint>(route, {
      ...options,
      baseUrl: this.context.apiUrl,
      mediaType: { format: 'json' },
      owner: this.context.repo.owner,
      repo: this.context.repo.repo
    }) as Promise<Response<Route>>
  }

  /**
   * Updates branch protection settings.
   *
   * @see {@linkcode Endpoint.BRANCH_PROTECTION}
   *
   * @public
   * @async
   *
   * @param {Branch[]} [branches=[]] - Branch configuration objects
   * @return {Promise<void>} Nothing when complete
   */
  public async updateBranches(branches: Branch[] = []): Promise<void> {
    for (const { name: branch, protection } of branches) {
      await this.request(Endpoint.BRANCH_PROTECTION, {
        ...protection,
        branch,
        checks: protection?.required_status_checks?.checks?.map(check => ({
          app_id: check.app_id ?? 15368,
          context: check.context
        }))
      })
    }

    return void branches
  }

  /**
   * Updates deployment environment settings.
   *
   * @see {@linkcode Endpoint.ENVIRONMENTS}
   * @see {@linkcode Endpoint.ENVIRONMENT_DELETE}
   * @see {@linkcode Endpoint.ENVIRONMENT_UPSERT}
   *
   * @public
   * @async
   *
   * @param {Environment[]} [environments=[]] - Environment configurations
   * @return {Promise<void>} Nothing when complete
   */
  public async updateEnvironments(
    environments: Environment[] = []
  ): Promise<void> {
    /**
     * Deployment environments to delete.
     *
     * @const {{ name: Environment['environment_name'] }[]} stale
     */
    const stale: { name: Environment['environment_name'] }[] = diff(
      await this.octokit.paginate(Endpoint.ENVIRONMENTS, this.context.repo),
      environments.map(env => ({ name: env.environment_name })),
      environment => environment.name
    )

    // remove stale environments
    for (const { name: environment_name } of stale) {
      await this.request(Endpoint.ENVIRONMENT_DELETE, { environment_name })
    }

    // upsert environments
    for (const environment of environments) {
      await this.request(Endpoint.ENVIRONMENT_UPSERT, environment)
    }

    return void environments
  }

  /**
   * Updates repository labels.
   *
   * @see {@linkcode Endpoint.LABELS}
   * @see {@linkcode Endpoint.LABEL_CREATE}
   * @see {@linkcode Endpoint.LABEL_DELETE}
   * @see {@linkcode Endpoint.LABEL_UPDATE}
   *
   * @public
   * @async
   *
   * @param {Label[]} [labels=[]] - Label objects
   * @return {Promise<void>} Nothing when complete
   */
  public async updateLabels(labels: Label[] = []): Promise<void> {
    /**
     * Current repository labels.
     *
     * @const {LabelResponse[]} current
     */
    const current: LabelResponse[] = await this.octokit.paginate(
      Endpoint.LABELS,
      this.context.repo
    )

    /**
     * Repository labels to delete.
     *
     * @const {Pick<Label, 'name'>[]} stale
     */
    const stale: Pick<Label, 'name'>[] = diff(
      current,
      labels.map(label => pick(label, ['name'])),
      label => label.name
    )

    // remove stale labels
    for (const { name } of stale) {
      await this.request(Endpoint.LABEL_DELETE, { name })
    }

    // upsert labels
    for (const label of labels) {
      current.some(curr => curr.name === label.name)
        ? await this.request(Endpoint.LABEL_UPDATE, label)
        : await this.request(Endpoint.LABEL_CREATE, label)
    }

    return void labels
  }

  /**
   * Updates general repository settings.
   *
   * @see {@linkcode Endpoint.AUTOMATED_SECURITY_FIXES_DISABLE}
   * @see {@linkcode Endpoint.AUTOMATED_SECURITY_FIXES_ENABLE}
   * @see {@linkcode Endpoint.REPOSITORY}
   * @see {@linkcode Endpoint.VULNERABILITY_ALERTS_DISABLE}
   * @see {@linkcode Endpoint.VULNERABILITY_ALERTS_ENABLE}
   *
   * @public
   * @async
   *
   * @param {Repository} [repository={}] - Repository settings
   * @return {Promise<void>} Nothing when complete
   */
  public async updateRepository(repository: Repository = {}): Promise<void> {
    const {
      automated_security_fixes = false,
      name = this.context.repo.repo,
      topics = [],
      vulnerability_alerts = false,
      ...rest
    } = repository

    // update repository
    await this.request(Endpoint.REPOSITORY, { ...rest, name })

    // update repository topics
    await this.request(Endpoint.TOPICS, { names: topics })

    // update automated security fixes
    await this.request(
      automated_security_fixes
        ? Endpoint.AUTOMATED_SECURITY_FIXES_ENABLE
        : Endpoint.AUTOMATED_SECURITY_FIXES_DISABLE
    )

    // update vulnerability alerts
    await this.request(
      vulnerability_alerts
        ? Endpoint.VULNERABILITY_ALERTS_ENABLE
        : Endpoint.VULNERABILITY_ALERTS_DISABLE
    )

    return void repository
  }

  /**
   * Updates team repository permissions.
   *
   * @see {@linkcode Endpoint.TEAM_REPO}
   *
   * @public
   * @async
   *
   * @param {Team[]} [teams=[]] - Team permission objects
   * @return {Promise<void>} Nothing when complete
   */
  public async updateTeams(teams: Team[] = []): Promise<void> {
    for (const team of teams) {
      await this.request(Endpoint.TEAM_REPO, {
        ...team,
        org: this.context.repo.owner
      })
    }

    return void teams
  }
}

export default Manager
