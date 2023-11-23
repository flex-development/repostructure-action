/**
 * @file Test Server - octokit
 * @module tests/setup/server/octokit
 */

import INPUT_API from '#fixtures/input-api.fixture'
import type {
  OctokitEndpoint,
  OctokitGraphql,
  OctokitHttp,
  OctokitResolver
} from '#tests/types'
import { isString, template } from '@flex-development/tutils'
import * as msw from 'msw'

/**
 * Get an interceptable GitHub API endpoint or URL.
 *
 * @template R - Route type
 *
 * @param {R} route - Route to convert
 * @return {R} Interceptable GitHub API endpoint or URL
 */
const api = <R extends msw.Path>(route: R): R => {
  if (isString(route)) {
    return <R>template('{api}{route}', {
      api: INPUT_API,
      route: route.replaceAll(/{(?<param>\w+)}/g, ':$1')
    })
  }

  return route
}

/**
 * Intercept GitHub GraphQL API requests
 *
 * @see https://mswjs.io/docs/api/graphql
 *
 * @const {OctokitGraphql} graphql
 */
const graphql: OctokitGraphql = msw.graphql.link(/\/graphql$/)

/**
 * Intercept GitHub REST API requests.
 *
 * @const {OctokitHttp} http
 */
const http: OctokitHttp = {
  /**
   * Create a HTTP handler to intercept `DELETE` requests.
   *
   * @template R - REST API route
   *
   * @param {R | RegExp} predicate - Request interceptor predicate
   * @param {OctokitResolver<'DELETE', R>} resolver - Request resolver
   * @param {msw.RequestHandlerOptions?} [options] - Request handler options
   * @return {msw.HttpHandler} HTTP handler
   */
  delete<R extends OctokitEndpoint<'DELETE'>>(
    predicate: R | RegExp,
    resolver: OctokitResolver<'DELETE', R>,
    options?: msw.RequestHandlerOptions
  ): msw.HttpHandler {
    return msw.http.delete(api(predicate), resolver, options)
  },

  /**
   * Create a HTTP handler to intercept `GET` requests.
   *
   * @template R - REST API route
   *
   * @param {R | RegExp} predicate - Request interceptor predicate
   * @param {OctokitResolver<'GET', R>} resolver - Request resolver
   * @param {msw.RequestHandlerOptions?} [options] - Request handler options
   * @return {msw.HttpHandler} HTTP handler
   */
  get<R extends OctokitEndpoint<'GET'>>(
    predicate: R | RegExp,
    resolver: OctokitResolver<'GET', R>,
    options?: msw.RequestHandlerOptions
  ): msw.HttpHandler {
    return msw.http.get(api(predicate), resolver, options)
  },

  /**
   * Create a HTTP handler to intercept `PATCH` requests.
   *
   * @template R - REST API route
   *
   * @param {R | RegExp} predicate - Request interceptor predicate
   * @param {OctokitResolver<'PATCH'>} resolver - Request resolver
   * @param {msw.RequestHandlerOptions?} [options] - Request handler options
   * @return {msw.HttpHandler} HTTP handler
   */
  patch<R extends OctokitEndpoint<'PATCH'>>(
    predicate: R | RegExp,
    resolver: OctokitResolver<'PATCH', R>,
    options?: msw.RequestHandlerOptions
  ): msw.HttpHandler {
    return msw.http.patch(api(predicate), resolver, options)
  },

  /**
   * Create a HTTP handler to intercept `POST` requests.
   *
   * @template R - REST API route
   *
   * @param {R | RegExp} predicate - Request interceptor predicate
   * @param {OctokitResolver<'POST', R>} resolver - Request resolver
   * @param {msw.RequestHandlerOptions?} [options] - Request handler options
   * @return {msw.HttpHandler} HTTP handler
   */
  post<R extends OctokitEndpoint<'POST'>>(
    predicate: R | RegExp,
    resolver: OctokitResolver<'POST', R>,
    options?: msw.RequestHandlerOptions
  ): msw.HttpHandler {
    return msw.http.post(api(predicate), resolver, options)
  },

  /**
   * Create a HTTP handler to intercept `PUT` requests.
   *
   * @template R - REST API route
   *
   * @param {R | RegExp} predicate - Request interceptor predicate
   * @param {OctokitResolver<'PUT', R>} resolver - Request resolver
   * @param {msw.RequestHandlerOptions?} [options] - Request handler options
   * @return {msw.HttpHandler} HTTP handler
   */
  put<R extends OctokitEndpoint<'PUT'>>(
    predicate: R | RegExp,
    resolver: OctokitResolver<'PUT', R>,
    options?: msw.RequestHandlerOptions
  ): msw.HttpHandler {
    return msw.http.put(api(predicate), resolver, options)
  }
}

export { graphql, http }
