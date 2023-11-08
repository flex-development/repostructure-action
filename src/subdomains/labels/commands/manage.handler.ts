/**
 * @file Commands - ManageLabelsHandler
 * @module repostructure/labels/commands/ManageLabelsHandler
 */

import type { Config } from '#src/config'
import { LabelsQuery } from '#src/labels/queries'
import type { Label } from '#src/labels/types'
import { includes, isUndefined, type Optional } from '@flex-development/tutils'
import { ConfigService } from '@nestjs/config'
import {
  CommandBus,
  CommandHandler,
  QueryBus,
  type ICommandHandler
} from '@nestjs/cqrs'
import CreateLabelCommand from './create.command'
import DeleteLabelCommand from './delete.command'
import ManageLabelsCommand from './manage.command'
import UpdateLabelCommand from './update.command'

/**
 * Label management command handler.
 *
 * @see {@linkcode Label}
 * @see {@linkcode ManageLabelsCommand}
 *
 * @class
 * @implements {ICommandHandler<ManageLabelsCommand, Label[]>}
 */
@CommandHandler(ManageLabelsCommand)
class ManageLabelsHandler
  implements ICommandHandler<ManageLabelsCommand, Label[]> {
  /**
   * Create a new label management command handler.
   *
   * @see {@linkcode CommandBus}
   * @see {@linkcode ConfigService}
   * @see {@linkcode Config}
   * @see {@linkcode QueryBus}
   *
   * @param {ConfigService<Config, true>} config - Infrastructure config service
   * @param {CommandBus} commands - Command bus
   * @param {QueryBus} queries - Query bus
   */
  constructor(
    protected readonly config: ConfigService<Config, true>,
    protected readonly commands: CommandBus,
    protected readonly queries: QueryBus
  ) {}

  /**
   * Execute a label management command.
   *
   * @see {@linkcode Label}
   * @see {@linkcode ManageLabelsCommand}
   *
   * @public
   * @async
   *
   * @param {ManageLabelsCommand} command - Command to execute
   * @return {Promise<Label[]>} Managed repository labels
   */
  public async execute(command: ManageLabelsCommand): Promise<Label[]> {
    /**
     * Managed repository labels.
     *
     * @const {Label[]} labels
     */
    const labels: Label[] = []

    // manage labels
    if (command.labels.length) {
      /**
       * Existing repository labels.
       *
       * @const {Label[]} current
       */
      const current: Label[] = await this.queries.execute(new LabelsQuery({
        owner: this.config.get('owner'),
        repo: this.config.get('repo')
      }))

      // delete stale labels
      for (const label of current) {
        if (!includes(command.labels, label, 0, label => label!.name)) {
          await this.commands.execute(new DeleteLabelCommand(label))
        }
      }

      // upsert labels
      for (const label of command.labels) {
        /**
         * Existing label, if any.
         *
         * Existing labels are identified by name.
         *
         * @const {Optional<Label>} existing
         */
        const existing: Optional<Label> = current.find(({ name }) => {
          return label.name === name
        })

        /**
         * Upserted label.
         *
         * @var {Label} upsert
         */
        let upsert!: Label

        // create new label or update existing label
        switch (true) {
          case isUndefined(existing):
            upsert = await this.commands.execute(new CreateLabelCommand(label))
            break
          default:
            upsert = await this.commands.execute(new UpdateLabelCommand({
              ...label,
              id: existing!.id
            }))
            break
        }

        // push upserted label
        labels.push(upsert)
      }
    }

    return labels
  }
}

export default ManageLabelsHandler
