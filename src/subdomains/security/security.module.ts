/**
 * @file SecurityModule
 * @module repostructure/security/SecurityModule
 */

import { Module } from '@nestjs/common'
import { ManageSecurityHandler } from './commands'

/**
 * Repository security module.
 *
 * @class
 */
@Module({ providers: [ManageSecurityHandler] })
class SecurityModule {}

export default SecurityModule
