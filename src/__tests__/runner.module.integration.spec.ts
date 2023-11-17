/**
 * @file Integration Tests - RunnerModule
 * @module tests/integration/RunnerModule
 */

import INPUT_CONFIG from '#fixtures/input-config.fixture'
import {
  ManageEnvironmentsCommand,
  ManageEnvironmentsHandler
} from '#src/environments/commands'
import { ManageLabelsCommand, ManageLabelsHandler } from '#src/labels/commands'
import type { Spy } from '#tests/interfaces'
import env from '#tests/setup/env'
import type { Constructor } from '@flex-development/tutils'
import type { Type } from '@nestjs/common'
import { Test, type TestingModuleBuilder } from '@nestjs/testing'
import TestSubject from '../runner.module'

vi.mock('@flex-development/mlly', () => ({
  getSource: vi.fn(async () => '{}').mockName('mlly.getSource')
}))

describe('integration:RunnerModule', () => {
  let commands: [Spy, Constructor<any>][]
  let environments: Spy<ManageEnvironmentsHandler['execute']>
  let labels: Spy<ManageLabelsHandler['execute']>

  beforeEach(() => {
    env((): void => void vi.stubEnv('INPUT_CONFIG', INPUT_CONFIG))

    environments = vi.spyOn(ManageEnvironmentsHandler.prototype, 'execute')
    labels = vi.spyOn(ManageLabelsHandler.prototype, 'execute')

    environments = environments.mockName('ManageEnvironmentsHandler#execute')
    labels = labels.mockName('ManageLabelsHandler#execute')

    commands = [
      [environments, ManageEnvironmentsCommand],
      [labels, ManageLabelsCommand]
    ]
  })

  it('should execute infrastructure management commands', async () => {
    // Arrange
    const imports: Type[] = [TestSubject]
    const builder: TestingModuleBuilder = Test.createTestingModule({ imports })

    // Act
    await (await builder.compile()).init()

    // Expect
    commands.forEach(([spy, Command]) => {
      expect(spy.mock.calls[0]![0]).to.be.instanceof(Command)
    })
  })
})
