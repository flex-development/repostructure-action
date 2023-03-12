/**
 * @file Type Tests - Endpoint
 * @module rice-action/enums/tests/unit-d/Endpoint
 */

import type TestSubject from '../endpoint'

describe('unit-d:enums/Endpoint', () => {
  it('should match [AUTOMATED_SECURITY_FIXES_DISABLE = "DELETE /repos/{owner}/{repo}/automated-security-fixes"]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('AUTOMATED_SECURITY_FIXES_DISABLE')
      .toMatchTypeOf<'DELETE /repos/{owner}/{repo}/automated-security-fixes'>()
  })

  it('should match [AUTOMATED_SECURITY_FIXES_ENABLE = "PUT /repos/{owner}/{repo}/automated-security-fixes"]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('AUTOMATED_SECURITY_FIXES_ENABLE')
      .toMatchTypeOf<'PUT /repos/{owner}/{repo}/automated-security-fixes'>()
  })

  it('should match [BRANCH_PROTECTION = "PUT /repos/{owner}/{repo}/branches/{branch}/protection"]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('BRANCH_PROTECTION')
      .toMatchTypeOf<'PUT /repos/{owner}/{repo}/branches/{branch}/protection'>()
  })

  it('should match [ENVIRONMENTS = "GET /repos/{owner}/{repo}/environments"]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('ENVIRONMENTS')
      .toMatchTypeOf<'GET /repos/{owner}/{repo}/environments'>()
  })

  it('should match [ENVIRONMENT_DELETE = "DELETE /repos/{owner}/{repo}/environments/{environment_name}"]', () => {
    // Arrange
    type Expected =
      'DELETE /repos/{owner}/{repo}/environments/{environment_name}'

    // Expect
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('ENVIRONMENT_DELETE')
      .toMatchTypeOf<Expected>()
  })

  it('should match [ENVIRONMENT_UPSERT = "PUT /repos/{owner}/{repo}/environments/{environment_name}"]', () => {
    // Arrange
    type Expected = 'PUT /repos/{owner}/{repo}/environments/{environment_name}'

    // Expect
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('ENVIRONMENT_UPSERT')
      .toMatchTypeOf<Expected>()
  })

  it('should match [LABELS = "GET /repos/{owner}/{repo}/labels"]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('LABELS')
      .toMatchTypeOf<'GET /repos/{owner}/{repo}/labels'>()
  })

  it('should match [LABEL_CREATE = "POST /repos/{owner}/{repo}/labels"]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('LABEL_CREATE')
      .toMatchTypeOf<'POST /repos/{owner}/{repo}/labels'>()
  })

  it('should match [LABEL_DELETE = "DELETE /repos/{owner}/{repo}/labels/{name}"]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('LABEL_DELETE')
      .toMatchTypeOf<'DELETE /repos/{owner}/{repo}/labels/{name}'>()
  })

  it('should match [LABEL_UPDATE = "PATCH /repos/{owner}/{repo}/labels/{name}"]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('LABEL_UPDATE')
      .toMatchTypeOf<'PATCH /repos/{owner}/{repo}/labels/{name}'>()
  })

  it('should match [REPOSITORY = "PATCH /repos/{owner}/{repo}"]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('REPOSITORY')
      .toMatchTypeOf<'PATCH /repos/{owner}/{repo}'>()
  })

  it('should match [TEAM_REPO = "PUT /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}"]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('TEAM_REPO')
      .toMatchTypeOf<'PUT /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}'>()
  })

  it('should match [TOPICS = "PUT /repos/{owner}/{repo}/topics"]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('TOPICS')
      .toMatchTypeOf<'PUT /repos/{owner}/{repo}/topics'>()
  })

  it('should match [VULNERABILITY_ALERTS_DISABLE = "DELETE /repos/{owner}/{repo}/vulnerability-alerts"]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('VULNERABILITY_ALERTS_DISABLE')
      .toMatchTypeOf<'DELETE /repos/{owner}/{repo}/vulnerability-alerts'>()
  })

  it('should match [VULNERABILITY_ALERTS_ENABLE = "PUT /repos/{owner}/{repo}/vulnerability-alerts"]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('VULNERABILITY_ALERTS_ENABLE')
      .toMatchTypeOf<'PUT /repos/{owner}/{repo}/vulnerability-alerts'>()
  })
})
