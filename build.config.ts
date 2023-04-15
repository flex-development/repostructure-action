/**
 * @file Configuration - Build
 * @module config/build
 * @see https://github.com/flex-development/mkbuild
 */

import { defineBuildConfig, type Config } from '@flex-development/mkbuild'
import pkg from './package.json' assert { type: 'json' }
import tsconfig from './tsconfig.build.json' assert { type: 'json' }

/**
 * Build configuration options.
 *
 * @const {Config} config
 */
const config: Config = defineBuildConfig({
  bundle: true,
  charset: 'utf8',
  conditions: tsconfig.compilerOptions.customConditions,
  dts: false,
  platform: 'node',
  source: 'src/main.ts',
  sourcemap: true,
  sourcesContent: false,
  target: [
    pkg.engines.node.replace(/^\D+/, 'node'),
    tsconfig.compilerOptions.target
  ],
  tsconfig: 'tsconfig.build.json'
})

export default config
