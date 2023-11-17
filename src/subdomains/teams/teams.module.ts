/**
 * @file TeamsModule
 * @module repostructure/teams/TeamsModule
 */

import { Module } from '@nestjs/common'
import { TeamHandler, TeamsHandler } from './queries'

/**
 * Organization teams module.
 *
 * @class
 */
@Module({ providers: [TeamHandler, TeamsHandler] })
class TeamsModule {}

export default TeamsModule
