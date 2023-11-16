/**
 * @file Type Tests - EnvironmentsHandler
 * @module environments/queries/tests/unit-d/EnvironmentsHandler
 */

import type { Environment } from '#src/environments/types'
import type { IQueryHandler } from '@nestjs/cqrs'
import type TestSubject from '../environments.handler'
import type EnvironmentsQuery from '../environments.query'

describe('unit-d:environments/queries/EnvironmentsHandler', () => {
  it('should implement IQueryHandler<EnvironmentsQuery, Environment[]>', () => {
    expectTypeOf<TestSubject>()
      .toMatchTypeOf<IQueryHandler<EnvironmentsQuery, Environment[]>>()
  })
})
