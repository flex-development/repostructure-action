/**
 * @file PullRequestsModule
 * @module repostructure/pull-requests/PullRequestsModule
 */

import { Module } from '@nestjs/common'
import { ManagePullRequestsHandler } from './commands'

/**
 * Pull request settings module.
 *
 * @class
 */
@Module({ providers: [ManagePullRequestsHandler] })
class PullRequestsModule {}

export default PullRequestsModule
