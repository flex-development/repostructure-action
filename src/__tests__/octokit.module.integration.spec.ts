/**
 * @file Integration Tests - OctokitModule
 * @module repostructure/tests/integration/OctokitModule
 */

import INPUT_CONFIG from '#fixtures/input-config.fixture'
import { ConfigModule } from '#src/config'
import env from '#tests/setup/env'
import { Test, TestingModuleBuilder } from '@nestjs/testing'
import { Octokit } from '@octokit/core'
import TestSubject from '../octokit.module'

describe('integration:OctokitModule', () => {
  beforeEach(() => {
    env((): void => {
      return void vi.stubEnv('INPUT_CONFIG', INPUT_CONFIG)
    })
  })

  it('should provide Octokit', async () => {
    // Arrange
    const ref: TestingModuleBuilder = Test.createTestingModule({
      imports: [ConfigModule.forRoot(), TestSubject]
    })

    // Act
    const { graphql, request } = (await ref.compile()).get(Octokit)

    // Expect
    expect(graphql).to.be.a('function')
    expect(request).to.be.a('function')
    expect(await graphql('{ viewer { login } }')).to.have.property('viewer')
  })
})
