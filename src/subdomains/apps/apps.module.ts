/**
 * @file AppsModule
 * @module repostructure/users/AppsModule
 */

import { Module } from '@nestjs/common'
import { AppHandler, AppsHandler } from './queries'

/**
 * GitHub Apps module.
 *
 * @class
 */
@Module({ providers: [AppHandler, AppsHandler] })
class AppsModule {}

export default AppsModule
