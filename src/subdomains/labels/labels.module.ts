/**
 * @file LabelsModule
 * @module repostructure/labels/LabelsModule
 */

import { Module } from '@nestjs/common'
import {
  CreateLabelHandler,
  DeleteLabelHandler,
  ManageLabelsHandler,
  UpdateLabelHandler
} from './commands'
import { LabelsQueryHandler } from './queries'

/**
 * Repository labels module.
 *
 * @class
 */
@Module({
  providers: [
    CreateLabelHandler,
    DeleteLabelHandler,
    LabelsQueryHandler,
    ManageLabelsHandler,
    UpdateLabelHandler
  ]
})
class LabelsModule {}

export default LabelsModule
