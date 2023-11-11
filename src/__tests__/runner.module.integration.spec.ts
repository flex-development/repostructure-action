/**
 * @file Integration Tests - RunnerModule
 * @module repostructure/tests/integration/RunnerModule
 */

import INPUT_CONFIG from '#fixtures/input-config.fixture'
import { ManageLabelsCommand, ManageLabelsHandler } from '#src/labels/commands'
import type { Spy } from '#tests/interfaces'
import env from '#tests/setup/env'
import type { Constructor } from '@flex-development/tutils'
import type { Type } from '@nestjs/common'
import { Test, TestingModuleBuilder } from '@nestjs/testing'
import TestSubject from '../runner.module'

vi.mock('@flex-development/mlly', () => ({
  getSource: vi.fn(async () => '{}').mockName('mlly.getSource')
}))

describe('integration:RunnerModule', () => {
  let labels: Spy<ManageLabelsHandler['execute']>
  let managers: [Spy, Constructor<any>][]

  beforeEach(() => {
    env((): void => void vi.stubEnv('INPUT_CONFIG', INPUT_CONFIG))

    labels = vi.spyOn(ManageLabelsHandler.prototype, 'execute')
    labels = labels.mockName('ManageLabelsHandler#execute')

    managers = [[labels, ManageLabelsCommand]]
  })

  it('should execute infrastructure management commands', async () => {
    // Arrange
    const imports: Type[] = [TestSubject]
    const builder: TestingModuleBuilder = Test.createTestingModule({ imports })

    // Act
    await (await builder.compile()).init()

    // Expect
    managers.forEach(([spy, Command]) => {
      expect(spy.mock.calls[0]![0]).to.be.instanceof(Command)
    })
  })
})
