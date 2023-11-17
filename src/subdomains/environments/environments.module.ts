/**
 * @file EnvironmentsModule
 * @module repostructure/environments/EnvironmentsModule
 */

import { Module } from '@nestjs/common'
import {
  CreateEnvironmentHandler,
  DeleteEnvironmentHandler,
  ManageEnvironmentsHandler,
  UpdateEnvironmentHandler
} from './commands'
import { EnvironmentsHandler } from './queries'

/**
 * Environments module.
 *
 * @class
 */
@Module({
  providers: [
    CreateEnvironmentHandler,
    DeleteEnvironmentHandler,
    EnvironmentsHandler,
    ManageEnvironmentsHandler,
    UpdateEnvironmentHandler
  ]
})
class EnvironmentsModule {}

export default EnvironmentsModule
