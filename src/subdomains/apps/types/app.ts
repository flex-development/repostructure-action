/**
 * @file Type Definitions - App
 * @module repostructure/apps/types/App
 */

/**
 * GitHub App object.
 */
type App = {
  /**
   * Node ID of GitHub App.
   */
  readonly id: string

  /**
   * URL-friendly name of GitHub App.
   */
  readonly slug: string
}

export type { App as default }
