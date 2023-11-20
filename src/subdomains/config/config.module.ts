/**
 * @file ConfigModule
 * @module repostructure/config/ConfigModule
 */

import pkg from '#pkg' assert { type: 'json' }
import schema from '#schema' assert { type: 'json' }
import type { Infrastructure } from '#src/types'
import * as core from '@actions/core'
import * as github from '@actions/github'
import { ERR_UNKNOWN_FILE_EXTENSION } from '@flex-development/errnode'
import * as mlly from '@flex-development/mlly'
import * as pathe from '@flex-development/pathe'
import {
  at,
  join,
  sift,
  type EmptyString,
  type JsonValue
} from '@flex-development/tutils'
import { Module, type DynamicModule } from '@nestjs/common'
import { ConfigModule as ConfigBaseModule } from '@nestjs/config'
import { graphql as request } from '@octokit/graphql'
import Ajv from 'ajv/dist/2020'
import * as graphql from 'graphql'
import gql from 'graphql-tag'
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
     * @var {JsonValue} infrastructure
     */
    let infrastructure!: JsonValue

    // get infrastructure object
    switch (ext) {
      case '.json':
      case '.json5':
      case '.jsonc':
        infrastructure = json5.parse(source)
        break
      case '.yaml':
      case '.yml':
        infrastructure = yaml.parse(source, {
          logLevel: 'error',
          prettyErrors: true,
          schema: 'core',
          sortMapEntries: true,
          version: '1.2'
        })
        break
      default:
        throw new ERR_UNKNOWN_FILE_EXTENSION(ext, path)
    }

    /**
     * JSON schema validator.
     *
     * @const {Ajv} validator
     */
    const validator: Ajv = new Ajv({
      logger: {
        error: core.error.bind(core),
        log: core.info.bind(core),
        warn: core.warning.bind(core)
      },
      removeAdditional: 'all',
      schemaId: '$id',
      schemas: [schema],
      strict: true,
      useDefaults: true,
      verbose: true
    })

    // throw on validation failure
    if (!validator.validate<Infrastructure>(schema, infrastructure)) {
      /**
       * Validation error message.
       *
       * @const {string} message
       */
      const message: string = validator.errorsText(validator.errors, {
        dataVar: 'config'
      })

      // throw validation error
      throw new Error(message, { cause: at(validator.errors, 0) })
    }

    return infrastructure
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
     * Personal access token (PAT) used to authenticate GitHub API requests.
     *
     * @const {string} token
     */
    const token: string = core.getInput('token', { required: true })

    /**
     * Repository data.
     *
     * @const {{ payload: { id: string } }} repository
     */
    const repository: { payload: { id: string } } = await request({
      baseUrl: api,
      headers: { authorization: join(['token', token], ' ') },
      owner,
      query: graphql.print(gql`
        query Repository($owner: String!, $repo: String!) {
          payload: repository(name: $repo, owner: $owner) {
            id
          }
        }
      `),
      repo,
      request: { fetch }
    })

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
      node_id: repository.payload.id,
      owner,
      repo,
      token
    }
  }
}

export default ConfigModule
