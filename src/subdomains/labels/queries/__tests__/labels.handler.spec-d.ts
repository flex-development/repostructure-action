/**
 * @file Type Tests - LabelsQueryHandler
 * @module repostructure/labels/queries/tests/unit-d/LabelsQueryHandler
 */

import type { Label } from '#src/labels/types'
import type { IQueryHandler } from '@nestjs/cqrs'
import type TestSubject from '../labels.handler'
import type LabelsQuery from '../labels.query'

describe('unit-d:labels/queries/LabelsQueryHandler', () => {
  it('should implement IQueryHandler<LabelsQuery, Label[]>', () => {
    expectTypeOf<TestSubject>()
      .toMatchTypeOf<IQueryHandler<LabelsQuery, Label[]>>()
  })
})
