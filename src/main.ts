/**
 * @file Main
 * @module repostructure/main
 */

import * as core from '@actions/core'
import { NestFactory } from '@nestjs/core'
import RunnerModule from './runner.module'

try {
  await NestFactory.createApplicationContext(RunnerModule, {
    abortOnError: false,
    logger: ['error', 'fatal', 'warn']
  })
} catch (e) {
  core.setFailed(<Error>e)
}
