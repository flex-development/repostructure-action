/**
 * @file ESLint Configuration - Root
 * @module config/eslint
 * @see https://eslint.org/docs/user-guide/configuring
 */

/**
 * @type {import('eslint').Linter.Config}
 * @const config - ESLint configuration object
 */
const config = {
  extends: ['./.eslintrc.base.cjs'],
  overrides: [
    ...require('./.eslintrc.base.cjs').overrides,
    {
      files: ['__tests__/utils/reply.ts'],
      rules: {
        'promise/prefer-await-to-callbacks': 0
      }
    },
    {
      files: [
        'src/interfaces/environment.ts',
        'src/interfaces/repository.ts',
        'src/interfaces/team.ts'
      ],
      rules: {
        'jsdoc/valid-types': 0
      }
    },
    {
      files: ['src/interfaces/environment.ts'],
      rules: {
        '@typescript-eslint/consistent-indexed-object-style': 0
      }
    }
  ],
  root: true
}

module.exports = config
