/**
 * @file Type Tests - AppHandler
 * @module apps/queries/tests/unit-d/AppHandler
 */

import type { App } from '#src/apps/types'
import type { IQueryHandler } from '@nestjs/cqrs'
import type TestSubject from '../app.handler'
import type AppQuery from '../app.query'

describe('unit-d:apps/queries/AppHandler', () => {
  it('should implement IQueryHandler<AppQuery, App>', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<IQueryHandler<AppQuery, App>>()
  })
})
