/**
 * @file Type Tests - AppsHandler
 * @module apps/queries/tests/unit-d/AppsHandler
 */

import type { App } from '#src/apps/types'
import type { IQueryHandler } from '@nestjs/cqrs'
import type TestSubject from '../apps.handler'
import type AppsQuery from '../apps.query'

describe('unit-d:apps/queries/AppsHandler', () => {
  it('should implement IQueryHandler<AppsQuery, App[]>', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<IQueryHandler<AppsQuery, App[]>>()
  })
})
