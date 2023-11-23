/**
 * @file Test Types - OctokitHttp
 * @module tests/types/OctokitHttp
 */

import type { HttpHandler, RequestHandlerOptions } from 'msw'
import type OctokitEndpoint from './octokit-endpoint'
import type OctokitResolver from './octokit-resolver'

/**
 * GitHub REST API request interceptors.
 */
type OctokitHttp = {
  delete<R extends OctokitEndpoint<'DELETE'>>(
    predicate: R | RegExp,
    resolver: OctokitResolver<'DELETE', R>,
    options?: RequestHandlerOptions
  ): HttpHandler

  get<R extends OctokitEndpoint<'GET'>>(
    predicate: R | RegExp,
    resolver: OctokitResolver<'GET', R>,
    options?: RequestHandlerOptions
  ): HttpHandler

  patch<R extends OctokitEndpoint<'PATCH'>>(
    predicate: R | RegExp,
    resolver: OctokitResolver<'PATCH', R>,
    options?: RequestHandlerOptions
  ): HttpHandler

  post<R extends OctokitEndpoint<'POST'>>(
    predicate: R | RegExp,
    resolver: OctokitResolver<'POST', R>,
    options?: RequestHandlerOptions
  ): HttpHandler

  put<R extends OctokitEndpoint<'PUT'>>(
    predicate: R | RegExp,
    resolver: OctokitResolver<'PUT', R>,
    options?: RequestHandlerOptions
  ): HttpHandler
}

export type { OctokitHttp as default }
