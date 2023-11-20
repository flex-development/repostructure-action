/**
 * @file BranchesModule
 * @module repostructure/branches/BranchesModule
 */

import { Module } from '@nestjs/common'
import {
  CreateBranchProtectionHandler,
  DeleteBranchProtectionHandler,
  ManageBranchProtectionsHandler,
  UpdateBranchProtectionHandler
} from './commands'
import { BranchProtectionsHandler } from './queries'

/**
 * Branches module.
 *
 * @class
 */
@Module({
  providers: [
    CreateBranchProtectionHandler,
    DeleteBranchProtectionHandler,
    BranchProtectionsHandler,
    ManageBranchProtectionsHandler,
    UpdateBranchProtectionHandler
  ]
})
class BranchesModule {}

export default BranchesModule
