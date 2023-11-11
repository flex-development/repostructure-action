/**
 * @file Main
 * @module repostructure/main
 */

import * as core from '@actions/core'
import type { INestApplicationContext as App } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import RunnerModule from './runner.module'

try {
  /**
   * NestJS application context.
   *
   * @const {App} app
   */
  const app: App = await NestFactory.createApplicationContext(RunnerModule, {
    abortOnError: false,
    logger: ['error', 'fatal', 'warn']
  })

  // manage repository infrastructure
  void await app.init()
} catch (e) {
  core.setFailed(<Error>e)
}
