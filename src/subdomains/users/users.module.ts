/**
 * @file UsersModule
 * @module repostructure/users/UsersModule
 */

import { Module } from '@nestjs/common'
import { UserHandler, UsersHandler } from './queries'

/**
 * GitHub users module.
 *
 * @class
 */
@Module({ providers: [UserHandler, UsersHandler] })
class UsersModule {}

export default UsersModule
