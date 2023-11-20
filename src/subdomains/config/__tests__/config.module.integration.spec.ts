/**
 * @file Integration Tests - ConfigModule
 * @module config/tests/integration/ConfigModule
 */

import INPUT_CONFIG from '#fixtures/input-config.fixture'
import env from '#tests/setup/env'
import { ConfigService } from '@nestjs/config'
import { Test, type TestingModuleBuilder } from '@nestjs/testing'
import TestSubject from '../config.module'

describe('integration:config/ConfigModule', () => {
  beforeEach(() => {
    env((): void => {
      return void vi.stubEnv('INPUT_CONFIG', INPUT_CONFIG)
    })
  })

  it('should provide ConfigService', async () => {
    // Arrange
    const ref: TestingModuleBuilder = Test.createTestingModule({
      imports: [TestSubject.forRoot()]
    })

    // Act
    const result = (await ref.compile()).get(ConfigService)

    // Expect
    expect(result).to.be.instanceof(ConfigService)
  })
})
