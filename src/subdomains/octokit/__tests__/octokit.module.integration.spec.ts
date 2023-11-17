/**
 * @file Integration Tests - OctokitModule
 * @module octokit/tests/integration/OctokitModule
 */

import INPUT_CONFIG from '#fixtures/input-config.fixture'
import { ConfigModule } from '#src/config'
import env from '#tests/setup/env'
import { Test, type TestingModuleBuilder } from '@nestjs/testing'
import { Octokit } from '@octokit/core'
import TestSubject from '../octokit.module'

describe('integration:octokit/OctokitModule', () => {
  beforeEach(() => {
    env((): void => {
      return void vi.stubEnv('INPUT_CONFIG', INPUT_CONFIG)
    })
  })

  it('should provide Octokit', async () => {
    // Arrange
    const builder: TestingModuleBuilder = Test.createTestingModule({
      imports: [ConfigModule.forRoot(), TestSubject]
    })

    // Act
    const { graphql, request } = (await builder.compile()).get(Octokit)

    // Expect
    expect(graphql).to.be.a('function')
    expect(request).to.be.a('function')
  })
})
