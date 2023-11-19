/**
 * @file Commands - CreateBranchProtectionHandler
 * @module repostructure/branches/commands/CreateBranchProtectionHandler
 */

import type { BranchProtection } from '#src/branches/types'
import type { Config } from '#src/config'
import { ConfigService } from '@nestjs/config'
import { CommandBus, CommandHandler, type ICommandHandler } from '@nestjs/cqrs'
import { Octokit } from '@octokit/core'
import type { CreateBranchProtectionRuleInput } from '@octokit/graphql-schema'
import * as graphql from 'graphql'
import gql from 'graphql-tag'
import CreateBranchProtectionCommand from './create.command'
import UpdateBranchProtectionCommand from './update.command'

/**
 * Branch protection rule creation command handler.
 *
 * @see {@linkcode CreateBranchProtectionCommand}
 *
 * @class
 * @implements {ICommandHandler<CreateBranchProtectionCommand,BranchProtection>}
 */
@CommandHandler(CreateBranchProtectionCommand)
class CreateBranchProtectionHandler
  implements ICommandHandler<CreateBranchProtectionCommand, BranchProtection> {
  /**
   * GraphQL mutation.
   *
   * @see https://docs.github.com/graphql/reference/mutations#createbranchprotectionrule
   *
   * @protected
   * @readonly
   * @instance
   * @member {string} operation
   */
  protected readonly operation: string

  /**
   * Create a new branch protection rule creation command handler.
   *
   * @see {@linkcode CommandBus}
   * @see {@linkcode ConfigService}
   * @see {@linkcode Config}
   * @see {@linkcode Octokit}
   *
   * @param {Octokit} octokit - Hydrated octokit client
   * @param {ConfigService<Config, true>} config - Infrastructure config service
   * @param {CommandBus} commands - Command bus
   */
  constructor(
    protected readonly octokit: Octokit,
    protected readonly config: ConfigService<Config, true>,
    protected readonly commands: CommandBus
  ) {
    this.operation = graphql.print(gql`
      mutation CreateBranchProtection(
        $input: CreateBranchProtectionRuleInput!
      ) {
        payload: createBranchProtectionRule(input: $input) {
          rule: branchProtectionRule {
            id
            pattern
          }
        }
      }
    `)
  }

  /**
   * Execute a branch protection rule creation command.
   *
   * @see {@linkcode CreateBranchProtectionCommand}
   *
   * @public
   * @async
   *
   * @param {CreateBranchProtectionCommand} command - Command to execute
   * @return {Promise<BranchProtection>} New branch protection rule
   */
  public async execute(
    command: CreateBranchProtectionCommand
  ): Promise<BranchProtection> {
    const {
      payload
    } = await this.octokit.graphql<{ rule: BranchProtection }>({
      input: <CreateBranchProtectionRuleInput>{
        clientMutationId: this.config.get<string>('id'),
        pattern: command.branch,
        repositoryId: this.config.get<string>('node_id')
      },
      query: this.operation
    })

    return this.commands.execute(new UpdateBranchProtectionCommand({
      ...command,
      id: payload.rule.id
    }))
  }
}

export default CreateBranchProtectionHandler
