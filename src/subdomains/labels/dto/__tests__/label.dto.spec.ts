/**
 * @file Unit Tests - LabelDTO
 * @module labels/dto/tests/unit/LabelDTO
 */

import TestSubject from '../label.dto'

describe('unit:labels/dto/LabelDTO', () => {
  describe('constructor', () => {
    let description: string
    let subject: TestSubject

    beforeAll(() => {
      subject = new TestSubject({ description: description = 'project tasks' })
    })

    it('should set #description', () => {
      expect(subject).to.have.property('description', description)
    })
  })
})
