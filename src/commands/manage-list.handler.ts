/**
 * @file Commands - ManageListHandler
 * @module repostructure/commands/ManageListHandler
 */

import type { Config } from '#src/config'
import type { RepositoryQuery } from '#src/queries'
import {
  includes,
  isUndefined,
  select,
  type Constructor,
  type ObjectCurly,
  type Optional
} from '@flex-development/tutils'
import type { ConfigService } from '@nestjs/config'
import type { CommandBus, ICommandHandler, QueryBus } from '@nestjs/cqrs'

/**
 * Abstract infrastructure list management command handler.
 *
 * @see {@linkcode ICommandHandler}
 *
 * @template H - Management command type
 * @template T - List node type
 *
 * @abstract
 * @class
 * @implements {ICommandHandler<H, T[]>}
 */
abstract class ManageListHandler<
  H extends ObjectCurly,
  T extends { id: string }
> implements ICommandHandler<H, T[]> {
  /**
   * Command bus.
   *
   * @protected
   * @abstract
   * @readonly
   * @instance
   * @member {CommandBus} commands
   */
  protected abstract readonly commands: CommandBus

  /**
   * Infrastructure config service.
   *
   * @protected
   * @abstract
   * @readonly
   * @instance
   * @member {ConfigService<Config, true>} config
   */
  protected abstract readonly config: ConfigService<Config, true>

  /**
   * Query bus.
   *
   * @protected
   * @abstract
   * @readonly
   * @instance
   * @member {QueryBus} queries
   */
  protected abstract readonly queries: QueryBus

  /**
   * Execute a management command.
   *
   * @public
   * @abstract
   * @async
   *
   * @param {H} command - Command to execute
   * @return {Promise<T[]>} - Managed infrastructure list
   */
  public abstract execute(command: H): Promise<T[]>

  /**
   * Manage an infrastructure list.
   *
   * @protected
   * @async
   *
   * @template Q - List query constructor type
   * @template C - Create command constructor type
   * @template D - Delete command constructor type
   * @template U - Update command constructor type
   *
   * @param {[keyof T, (keyof InstanceType<C>)?]} keys - Node comparison keys
   * @param {keyof T} keys.0 - Primary key of current nodes
   * @param {keyof InstanceType<C>} keys.1 - Primary key of `list` nodes
   * @param {InstanceType<C>[]} list - Infrastructure list to manage
   * @param {Q} Query - Query to execute to find existing nodes
   * @param {D} Delete - Command to execute to remove stale nodes
   * @param {C} Create - Command to execute to create new nodes
   * @param {U} Update - Command to execute to update nodes
   * @return {Promise<T[]>} Managed infrastructure list
   */
  protected async manage<
    Q extends Constructor<RepositoryQuery> = Constructor<RepositoryQuery>,
    C extends Constructor<ObjectCurly> = Constructor<ObjectCurly>,
    D extends Constructor<{ id: string }> = Constructor<{ id: string }>,
    U extends Constructor<{ id: string }> = Constructor<{ id: string }>
  >(
    keys: [keyof T, (keyof InstanceType<C>)?],
    list: InstanceType<C>[],
    Query: Q,
    Delete: D,
    Create: C,
    Update: U
  ): Promise<T[]> {
    const [pk, mk = pk] = keys

    /**
     * Managed infrastructure list.
     *
     * @const {T[]} managed
     */
    const managed: T[] = []

    // manage infrastructure list
    if (list.length) {
      /**
       * Current infrastructure list.
       *
       * @const {T[]} current
       */
      const current: T[] = await this.queries.execute(new Query({
        owner: this.config.get('owner'),
        repo: this.config.get('repo')
      }))

      /**
       * Infrastructure list keys.
       *
       * @const {(keyof InstanceType<C>)[]} mapped
       */
      const mapped: (keyof InstanceType<C>)[] = select(list, null, n => n[mk])

      // delete stale list nodes
      for (const curr of current) {
        if (!includes(mapped, curr[pk])) {
          await this.commands.execute(new Delete(curr))
        }
      }

      // upsert list nodes
      for (const node of list) {
        /**
         * Existing infrastructure list node, if any.
         *
         * @const {Optional<T>} curr
         */
        const curr: Optional<T> = current.find(curr => curr[pk] === node[mk])

        // push upserted node
        managed.push(
          isUndefined(curr)
            ? await this.commands.execute(new Create(node))
            : await this.commands.execute(new Update({ ...node, id: curr.id }))
        )
      }
    }

    return managed
  }
}

export default ManageListHandler
