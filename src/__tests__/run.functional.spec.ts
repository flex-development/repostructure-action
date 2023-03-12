/**
 * @file Functional Tests - run
 * @module rice-action/tests/functional/run
 */

import settings from '#fixtures/settings'
import Manager from '#src/models/manager'
import mockGithubAPI from '#tests/utils/mock-github-api'
import * as core from '@actions/core'
import * as yaml from 'yaml'
import testSubject from '../run'

vi.mock('@actions/core')
vi.mock('yaml')

describe('functional:run', () => {
  it('should set action failure if error parsing settings file', async () => {
    // Arrange
    vi.stubEnv('INPUT_SETTINGS', 'settings.yml')

    // Act
    await testSubject()

    // Expect
    expect(core.setFailed).toHaveBeenCalledOnce()
    expect(core.setFailed).toHaveBeenCalledWith(expect.any(Error))
  })

  it('should set action failure if error updating infrastructure', async () => {
    // Arrange
    const token: string = 'ghp_' + faker.string.alphanumeric({ length: 36 })
    vi.stubEnv('INPUT_SETTINGS', '.github/settings.yml')
    vi.stubEnv('INPUT_TOKEN', token)

    // Act
    await testSubject()

    // Expect
    expect(core.setFailed).toHaveBeenCalledOnce()
    expect(core.setFailed).toHaveBeenCalledWith(expect.any(Error))
  })

  it('should update infrastructure', async () => {
    // Arrange
    vi.stubEnv('INPUT_SETTINGS', '.github/settings.yml')
    vi.stubEnv('INPUT_TOKEN', process.env.GITHUB_TOKEN!)
    const updateBranches = vi.spyOn(Manager.prototype, 'updateBranches')
    const updateEnvironments = vi.spyOn(Manager.prototype, 'updateEnvironments')
    const updateLabels = vi.spyOn(Manager.prototype, 'updateLabels')
    const updateRepository = vi.spyOn(Manager.prototype, 'updateRepository')
    const updateTeams = vi.spyOn(Manager.prototype, 'updateTeams')

    // Act
    vi.mocked(yaml.parse).mockReturnValueOnce(settings)
    mockGithubAPI()
    await testSubject()

    // Expect
    expect(core.setFailed).not.toHaveBeenCalled()
    expect(updateRepository).toHaveBeenCalledOnce()
    expect(updateRepository).toHaveBeenLastCalledWith(settings.repository)
    expect(updateEnvironments).toHaveBeenCalledOnce()
    expect(updateEnvironments).toHaveBeenLastCalledWith(settings.environments)
    expect(updateLabels).toHaveBeenCalledOnce()
    expect(updateLabels).toHaveBeenLastCalledWith(settings.labels)
    expect(updateTeams).toHaveBeenCalledOnce()
    expect(updateTeams).toHaveBeenLastCalledWith(settings.teams)
    expect(updateBranches).toHaveBeenCalledOnce()
    expect(updateBranches).toHaveBeenLastCalledWith(settings.branches)
  })
})
