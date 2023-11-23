/**
 * @file Commands - UpdateBranchProtectionHandler
 * @module repostructure/branches/commands/UpdateBranchProtectionHandler
 */

import { AppQuery, AppsQuery } from '#src/apps/queries'
import type { App } from '#src/apps/types'
import type {
  BranchActors,
  BranchProtection,
  StatusCheck
} from '#src/branches/types'
import type { Config } from '#src/config'
import { Octokit } from '#src/octokit'
import { TeamsQuery } from '#src/teams/queries'
import type { Team } from '#src/teams/types'
import { UsersQuery } from '#src/users/queries'
import type { User } from '#src/users/types'
import {
  fallback,
  isFalsy,
  isNIL,
  isNull,
  reduceAsync,
  select,
  shake,
  type NIL,
  type Nullable
} from '@flex-development/tutils'
import { ConfigService } from '@nestjs/config'
import { CommandHandler, QueryBus, type ICommandHandler } from '@nestjs/cqrs'
import type {
  RequiredStatusCheckInput,
  UpdateBranchProtectionRuleInput
} from '@octokit/graphql-schema'
import * as graphql from 'graphql'
import gql from 'graphql-tag'
import UpdateBranchProtectionCommand from './update.command'

/**
 * Branch protection rule update command handler.
 *
 * @see {@linkcode BranchProtection}
 * @see {@linkcode UpdateBranchProtectionCommand}
 *
 * @class
 * @implements {ICommandHandler<UpdateBranchProtectionCommand,BranchProtection>}
 */
@CommandHandler(UpdateBranchProtectionCommand)
class UpdateBranchProtectionHandler
  implements ICommandHandler<UpdateBranchProtectionCommand, BranchProtection> {
  /**
   * GraphQL mutation.
   *
   * @see https://docs.github.com/graphql/reference/mutations#updatebranchprotectionrule
   *
   * @protected
   * @readonly
   * @instance
   * @member {string} operation
   */
  protected readonly operation: string

  /**
   * Create a new branch protection rule update command handler.
   *
   * @see {@linkcode ConfigService}
   * @see {@linkcode Config}
   * @see {@linkcode Octokit}
   * @see {@linkcode QueryBus}
   *
   * @param {Octokit} octokit - Hydrated octokit client
   * @param {ConfigService<Config, true>} config - Infrastructure config service
   * @param {QueryBus} queries - Query bus
   */
  constructor(
    protected readonly octokit: Octokit,
    protected readonly config: ConfigService<Config, true>,
    protected readonly queries: QueryBus
  ) {
    this.operation = graphql.print(gql`
      mutation UpdateBranchProtection(
        $input: UpdateBranchProtectionRuleInput!
      ) {
        payload: updateBranchProtectionRule(input: $input) {
          rule: branchProtectionRule {
            id
            pattern
          }
        }
      }
    `)
  }

  /**
   * Get an array of containing branch actor ids.
   *
   * @protected
   * @async
   *
   * @param {Nullable<BranchActors>} actors - Branch actors
   * @return {Promise<Nullable<string[]>>} Branch actor ids or `null`
   */
  protected async actorIds(
    actors: Nullable<BranchActors>
  ): Promise<Nullable<string[]>> {
    if (actors) {
      const {
        apps = [],
        teams = [],
        users = []
      } = shake<BranchActors, NIL>(actors, isNIL)

      /**
       * Organization name.
       *
       * @const {string} org
       */
      const org: string = this.config.get<string>('owner')

      return select(<(App | Team | User)[]>[
        ...await this.queries.execute(new AppsQuery({ apps })),
        ...await this.queries.execute(new TeamsQuery({ org, teams })),
        ...await this.queries.execute(new UsersQuery({ users }))
      ], null, actor => actor.id)
    }

    return actors
  }

  /**
   * Execute a branch protection rule update command.
   *
   * @see {@linkcode BranchProtection}
   * @see {@linkcode UpdateBranchProtectionCommand}
   *
   * @public
   * @async
   *
   * @param {UpdateBranchProtectionCommand} command - Command to execute
   * @return {Promise<BranchProtection>} Updated branch protection rule
   */
  public async execute(
    command: UpdateBranchProtectionCommand
  ): Promise<BranchProtection> {
    const {
      commit_signatures: requiresCommitSignatures = null,
      conversation_resolution: requiresConversationResolution = null,
      creations_blocked: blocksCreations = null,
      deletions: allowsDeletions = null,
      deployments: {
        environments: requiredDeploymentEnvironments = null,
        strict: requiresDeployments = null
      } = {},
      enforce_admins: isAdminEnforced = null,
      force_pushers: bypassForcePushActors = null,
      force_pushes: allowsForcePushes = null,
      fork_syncing: lockAllowsFetchAndMerge = null,
      id: branchProtectionRuleId,
      linear_history: requiresLinearHistory = null,
      lock_branch: lockBranch = null,
      pull_requests: {
        approving_review_count: requiredApprovingReviewCount = null,
        bypass_restrictions: bypassPullRequestActors = null,
        code_owner_reviews: requiresCodeOwnerReviews = null,
        dismiss_stale_reviews: dismissesStaleReviews = null,
        dismissal_restrictions: reviewDismissalActors = null,
        last_push_approval: requireLastPushApproval = null
      } = {},
      restrictions: pushActors = null,
      status_checks: {
        checks = [],
        strict: requiresStrictStatusChecks = null
      } = {}
    } = shake<UpdateBranchProtectionCommand, NIL>(command, isNIL)

    /**
     * Node IDs of users, teams, and apps allowed to push to matching branches.
     *
     * @const {string[]} pushActorIds
     */
    const pushActorIds: string[] = fallback(
      await this.actorIds(pushActors),
      [],
      isNull
    )

    /**
     * Node IDs of users, teams, and apps allowed to dismiss pull request
     * reviews.
     *
     * @const {string[]} reviewDismissalActorIds
     */
    const reviewDismissalActorIds: string[] = fallback(
      await this.actorIds(reviewDismissalActors),
      [],
      isNull
    )

    // update branch protection rule
    const {
      payload
    } = await this.octokit.graphql<{ rule: BranchProtection }>({
      input: <UpdateBranchProtectionRuleInput>{
        allowsDeletions,
        allowsForcePushes,
        blocksCreations,
        branchProtectionRuleId,
        bypassForcePushActorIds: await this.actorIds(bypassForcePushActors),
        bypassPullRequestActorIds: await this.actorIds(bypassPullRequestActors),
        clientMutationId: this.config.get<string>('id'),
        dismissesStaleReviews,
        isAdminEnforced,
        lockAllowsFetchAndMerge,
        lockBranch,
        pushActorIds,
        requireLastPushApproval,
        requiredApprovingReviewCount,
        requiredDeploymentEnvironments,
        requiredStatusChecks: await reduceAsync(checks, async (acc, check) => {
          const {
            app = 'github-actions',
            context
          } = shake<StatusCheck, NIL>(check, isNIL)

          const {
            id: appId
          } = await this.queries.execute<AppQuery, App>(new AppQuery({ app }))

          return [...acc, { appId, context }]
        }, <RequiredStatusCheckInput[]>[]),
        requiresApprovingReviews: !isFalsy(requiredApprovingReviewCount),
        requiresCodeOwnerReviews,
        requiresCommitSignatures,
        requiresConversationResolution,
        requiresDeployments,
        requiresLinearHistory,
        requiresStatusChecks: !!checks.length,
        requiresStrictStatusChecks,
        restrictsPushes: !!pushActorIds.length,
        restrictsReviewDismissals: !!reviewDismissalActorIds.length,
        reviewDismissalActorIds: await this.actorIds(reviewDismissalActors)
      },
      query: this.operation
    })

    return payload.rule
  }
}

export default UpdateBranchProtectionHandler
