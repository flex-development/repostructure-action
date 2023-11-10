/**
 * @file ConfigModule
 * @module repostructure/config/ConfigModule
 */

import pkg from '#pkg' assert { type: 'json' }
import type { Infrastructure } from '#src/types'
import * as core from '@actions/core'
import * as github from '@actions/github'
import { ERR_UNKNOWN_FILE_EXTENSION } from '@flex-development/errnode'
import * as mlly from '@flex-development/mlly'
import * as pathe from '@flex-development/pathe'
import {
  defaults,
  fallback,
  get,
  isNull,
  join,
  sift,
  template,
  type EmptyString,
  type Partial
} from '@flex-development/tutils'
import { Module, type DynamicModule } from '@nestjs/common'
import { ConfigModule as ConfigBaseModule } from '@nestjs/config'
import json5 from 'json5'
import * as yaml from 'yaml'
import type { Config } from './interfaces'

/**
 * Infrastructure configuration module.
 *
 * @class
 * @extends {ConfigBaseModule}
 */
@Module({})
class ConfigModule extends ConfigBaseModule {
  /**
   * Register a global dynamic module.
   *
   * @public
   * @static
   * @override
   *
   * @return {DynamicModule} Global dynamic module
   */
  public static override forRoot(): DynamicModule {
    return {
      ...super.forRoot({
        envFilePath: sift([process.env.GITHUB_ENV]),
        expandVariables: true,
        ignoreEnvFile: false,
        ignoreEnvVars: false,
        isGlobal: true,
        load: [ConfigModule.load]
      }),
      module: ConfigModule
    }
  }

  /**
   * Get a repository infrastructure object.
   *
   * @public
   * @static
   * @async
   *
   * @param {string} file - Infrastructure file location
   * @param {string} workspace - Absolute path to current working directory
   * @return {Promise<Infrastructure>} Repository infrastructure object
   * @throws {Error} If loading fails
   */
  public static async infrastructure(
    file: string,
    workspace: string
  ): Promise<Infrastructure> {
    /**
     * Config file extension.
     *
     * @const {EmptyString | pathe.Ext} ext
     */
    const ext: EmptyString | pathe.Ext = pathe.extname(file)

    /**
     * Absolute path to infrastructure file.
     *
     * @const {string} path
     */
    const path: string = pathe.resolve(workspace, file)

    /**
     * Infrastructure file content.
     *
     * @const {string} source
     */
    const source: string = <string>await mlly.getSource(path)

    /**
     * Repository infrastructure object.
     *
     * @var {Partial<Infrastructure>} infrastructure
     */
    let infrastructure!: Partial<Infrastructure>

    // get infrastructure object
    switch (ext) {
      case '.json':
      case '.json5':
      case '.jsonc':
        infrastructure = json5.parse(source)
        break
      case '.yaml':
      case '.yml':
        infrastructure = fallback(yaml.parse(source, {
          logLevel: 'error',
          prettyErrors: true,
          schema: 'core',
          sortMapEntries: true,
          version: 'next'
        }), {}, isNull)
        break
      default:
        throw new ERR_UNKNOWN_FILE_EXTENSION(ext, path)
    }

    return <Infrastructure>defaults(infrastructure, {
      labels: []
    })
  }

  /**
   * Get a configuration object.
   *
   * @see {@linkcode Config}
   *
   * @public
   * @static
   * @async
   *
   * @return {Promise<Config>} Configuration object
   */
  public static async load(): Promise<Config> {
    const { owner, repo } = github.context.repo

    /**
     * Base URL of GitHub API.
     *
     * @const {string} api
     */
    const api: string = core.getInput('api', { required: true })

    /**
     * Repository data response.
     *
     * @const {Response} info
     */
    const info: Response = await fetch(template('{api}/repos/{owner}/{repo}', {
      api,
      owner,
      repo
    }))

    /**
     * Absolute path to current working directory.
     *
     * @const {string} workspace
     */
    const workspace: string = core.getInput('workspace', { required: true })

    /**
     * Configuration file location relative to {@linkcode workspace}.
     *
     * @const {string} file
     */
    const file: string = core.getInput('config', { required: true })

    return {
      api,
      id: join([pkg.name, pkg.version], pathe.sep),
      infrastructure: await ConfigModule.infrastructure(file, workspace),
      node_id: get(await info.json(), 'node_id'),
      owner,
      repo,
      token: core.getInput('token', { required: true })
    }
  }
}

export default ConfigModule
