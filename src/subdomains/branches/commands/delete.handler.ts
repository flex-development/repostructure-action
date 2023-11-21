/**
 * @file Commands - DeleteBranchProtectionHandler
 * @module repostructure/branches/commands/DeleteBranchProtectionHandler
 */

import type { Config } from '#src/config'
import { Octokit } from '#src/octokit'
import { ConfigService } from '@nestjs/config'
import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs'
import type { DeleteBranchProtectionRuleInput } from '@octokit/graphql-schema'
import * as graphql from 'graphql'
import gql from 'graphql-tag'
import DeleteBranchProtectionCommand from './delete.command'

/**
 * Branch protection rule deletion command handler.
 *
 * @see {@linkcode DeleteBranchProtectionCommand}
 *
 * @class
 * @implements {ICommandHandler<DeleteBranchProtectionCommand, void>}
 */
@CommandHandler(DeleteBranchProtectionCommand)
class DeleteBranchProtectionHandler
  implements ICommandHandler<DeleteBranchProtectionCommand, void> {
  /**
   * GraphQL mutation.
   *
   * @see https://docs.github.com/graphql/reference/mutations#deletebranchprotectionrule
   *
   * @protected
   * @readonly
   * @instance
   * @member {string} operation
   */
  protected readonly operation: string

  /**
   * Create a new branch protection rule deletion command handler.
   *
   * @see {@linkcode ConfigService}
   * @see {@linkcode Config}
   * @see {@linkcode Octokit}
   *
   * @param {Octokit} octokit - Hydrated octokit client
   * @param {ConfigService<Config, true>} config - Infrastructure config service
   */
  constructor(
    protected readonly octokit: Octokit,
    protected readonly config: ConfigService<Config, true>
  ) {
    this.operation = graphql.print(gql`
      mutation DeleteBranchProtection(
        $input: DeleteBranchProtectionRuleInput!
      ) {
        payload: deleteBranchProtectionRule(input: $input) {
          clientMutationId
        }
      }
    `)
  }

  /**
   * Execute a branch protection rule deletion command.
   *
   * @see {@linkcode DeleteBranchProtectionCommand}
   *
   * @public
   * @async
   *
   * @param {DeleteBranchProtectionCommand} command - Command to execute
   * @return {Promise<void>} Nothing when complete
   */
  public async execute(command: DeleteBranchProtectionCommand): Promise<void> {
    return void (await this.octokit.graphql({
      input: <DeleteBranchProtectionRuleInput>{
        branchProtectionRuleId: command.id,
        clientMutationId: this.config.get('id')
      },
      query: this.operation
    }))
  }
}

export default DeleteBranchProtectionHandler
