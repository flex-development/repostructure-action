/**
 * @file Functional Tests - ManageBranchProtectionsHandler
 * @module branches/commands/tests/functional/ManageBranchProtectionsHandler
 */

import api from '#fixtures/api.github.json' assert { type: 'json' }
import CLIENT_MUTATION_ID from '#fixtures/client-mutation-id.fixture'
import OctokitProvider from '#fixtures/octokit.provider.fixture'
import { AppHandler, AppsHandler } from '#src/apps/queries'
import { BranchProtectionsHandler } from '#src/branches/queries'
import type { BranchProtection } from '#src/branches/types'
import { TeamHandler, TeamsHandler } from '#src/teams/queries'
import { UserHandler, UsersHandler } from '#src/users/queries'
import type { Spy } from '#tests/interfaces'
import { at, select } from '@flex-development/tutils'
import { ConfigService } from '@nestjs/config'
import { CqrsModule } from '@nestjs/cqrs'
import { Test, type TestingModule } from '@nestjs/testing'
import CreateBranchProtectionCommand from '../create.command'
import CreateBranchProtectionHandler from '../create.handler'
import DeleteBranchProtectionHandler from '../delete.handler'
import ManageBranchProtectionsCommand from '../manage.command'
import TestSubject from '../manage.handler'
import UpdateBranchProtectionHandler from '../update.handler'

describe('functional:branches/commands/ManageBranchProtectionsHandler', () => {
  let ref: TestingModule
  let subject: TestSubject

  beforeAll(async () => {
    ref = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        AppHandler,
        AppsHandler,
        BranchProtectionsHandler,
        CreateBranchProtectionHandler,
        DeleteBranchProtectionHandler,
        OctokitProvider,
        TeamHandler,
        TeamsHandler,
        TestSubject,
        UpdateBranchProtectionHandler,
        UserHandler,
        UsersHandler,
        {
          provide: ConfigService,
          useValue: new ConfigService({
            id: CLIENT_MUTATION_ID,
            node_id: api.graphql.repository.id,
            owner: api.graphql.organization.login,
            repo: api.graphql.repository.name
          })
        }
      ]
    }).compile()

    subject = (await ref.init()).get(TestSubject)
  })

  describe('#execute', () => {
    let command: ManageBranchProtectionsCommand
    let current: CreateBranchProtectionCommand[]
    let create: Spy<CreateBranchProtectionHandler['execute']>
    let incoming: CreateBranchProtectionCommand[]
    let list: Spy<BranchProtectionsHandler['execute']>
    let nodes: BranchProtection[]
    let remove: Spy<DeleteBranchProtectionHandler['execute']>
    let update: Spy<UpdateBranchProtectionHandler['execute']>

    beforeAll(() => {
      incoming = [{ branch: 'release/*' }]
      nodes = api.graphql.repository.branchProtectionRules.nodes
      current = [at(select(nodes, null, n => ({ branch: n.pattern })), -1)]

      command = new ManageBranchProtectionsCommand([
        ...incoming,
        ...current
      ])
    })

    beforeEach(() => {
      create = vi.spyOn(CreateBranchProtectionHandler.prototype, 'execute')
      list = vi.spyOn(BranchProtectionsHandler.prototype, 'execute')
      remove = vi.spyOn(DeleteBranchProtectionHandler.prototype, 'execute')
      update = vi.spyOn(UpdateBranchProtectionHandler.prototype, 'execute')

      create = create.mockName('CreateBranchProtectionHandler#execute')
      list = list.mockName('BranchProtectionsHandler#execute')
      remove = remove.mockName('DeleteBranchProtectionHandler#execute')
      update = update.mockName('UpdateBranchProtectionHandler#execute')
    })

    it('should do nothing given zero branch protection rules', async () => {
      // Act
      await subject.execute(new ManageBranchProtectionsCommand([]))

      // Expect
      expect(create).not.toHaveBeenCalled()
      expect(list).not.toHaveBeenCalled()
      expect(remove).not.toHaveBeenCalled()
      expect(update).not.toHaveBeenCalled()
    })

    it('should manage branch protection rules', async () => {
      // Act
      await subject.execute(command)

      // Expect
      expect(list).toHaveBeenCalledOnce()
      expect(remove).toHaveBeenCalledTimes(nodes.length - current.length)
      expect(create).toHaveBeenCalledTimes(incoming.length)
      expect(update).toHaveBeenCalledTimes(current.length + incoming.length)
    })
  })
})
