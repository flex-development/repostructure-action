declare global {
  /**
   * Mock server type.
   *
   * @see https://mswjs.io/docs/api/setup-server
   */
  type SetupServer = import('msw/node').SetupServer

  /**
   * Mock server.
   *
   * @see {@linkcode SetupServer}
   *
   * @var {SetupServer} server
   */
  var server: SetupServer
}

export {}
