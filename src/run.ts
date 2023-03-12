/**
 * @file Action Runner
 * @module rice-action/run
 */

import type { Config } from '#src/interfaces'
import Manager from '#src/models/manager'
import * as core from '@actions/core'
import * as github from '@actions/github'
import fs from 'node:fs'
import * as yaml from 'yaml'

/**
 * Updates repository infrastructure settings.
 *
 * @todo debug log integration
 *
 * @async
 *
 * @return {Promise<void>} Nothing when complete
 */
async function run(): Promise<void> {
  /**
   * Repository infrastructure settings object.
   *
   * @var {Config} settings
   */
  let settings!: Config

  // try parsing settings file
  try {
    settings = yaml.parse(fs.readFileSync(core.getInput('config'), 'utf8'), {
      logLevel: 'error',
      prettyErrors: true,
      sortMapEntries: true,
      version: '1.2'
    })
  } catch (e: unknown) {
    return void core.setFailed(e as Error)
  }

  try {
    /**
     * Repository infrastructure manager.
     *
     * @const {Manager} manager
     */
    const manager = new Manager(
      github.getOctokit(core.getInput('token')),
      github.context
    )

    // update infrastructure
    await manager.updateRepository(settings.repository)
    await manager.updateEnvironments(settings.environments)
    await manager.updateLabels(settings.labels)
    await manager.updateTeams(settings.teams)
    await manager.updateBranches(settings.branches)
  } catch (e: unknown) {
    return void core.setFailed(e as Error)
  }

  return void 0
}

export default run
