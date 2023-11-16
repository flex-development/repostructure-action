/**
 * @file Functional Tests - ConfigModule
 * @module config/tests/functional/ConfigModule
 */

import * as mlly from '@flex-development/mlly'
import pathe from '@flex-development/pathe'
import type { Dot, EmptyString, Join } from '@flex-development/tutils'
import json5 from 'json5'
import * as yaml from 'yaml'
import TestSubject from '../config.module'

vi.mock('@flex-development/mlly', () => ({ getSource: vi.fn() }))
vi.mock('yaml', async og => ({ parse: vi.fn((await og<typeof yaml>()).parse) }))

describe('functional:config/ConfigModule', () => {
  describe('.infrastructure', () => {
    let workspace: string

    beforeAll(() => {
      workspace = import.meta.env.INPUT_WORKSPACE
    })

    describe.each<Join<[Dot, 'json' | 'json5' | 'jsonc'], EmptyString>>([
      '.json',
      '.json5',
      '.jsonc'
    ])('%s', ext => {
      let file: string
      let source: string

      beforeAll(() => {
        file = pathe.join('.github', 'infrastructure' + ext)
        source = '{}'
      })

      beforeEach(() => {
        vi.spyOn(mlly, 'getSource').mockImplementationOnce(async () => source)
        vi.spyOn(json5, 'parse')
      })

      it(`should parse file with ${ext} extension`, async () => {
        // Act
        await TestSubject.infrastructure(file, workspace)

        // Expect
        expect(vi.mocked(json5.parse)).toHaveBeenCalledOnce()
        expect(vi.mocked(json5.parse)).toHaveBeenCalledWith(source)
      })
    })

    describe.each<Join<[Dot, 'yaml' | 'yml'], EmptyString>>([
      '.yaml',
      '.yml'
    ])('%s', ext => {
      let file: string
      let source: string

      beforeAll(() => {
        file = pathe.join('.github', 'infrastructure' + ext)
        source = ''
      })

      beforeEach(() => {
        vi.spyOn(mlly, 'getSource').mockImplementationOnce(async () => source)
        vi.spyOn(yaml, 'parse')
      })

      it(`should parse file with ${ext} extension`, async () => {
        // Act
        await TestSubject.infrastructure(file, workspace)

        // Expect
        expect(vi.mocked(yaml.parse)).toHaveBeenCalledOnce()
        expect(vi.mocked(yaml.parse)).toHaveBeenCalledWith(source, {
          logLevel: 'error',
          prettyErrors: true,
          schema: 'core',
          sortMapEntries: true,
          version: 'next'
        })
      })
    })
  })
})
