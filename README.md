# :rice: rice-action

[![infrastructure](https://github.com/flex-development/rice-action/actions/workflows/infrastructure.yml/badge.svg)](https://github.com/flex-development/rice-action/actions/workflows/infrastructure.yml)
[![codecov](https://codecov.io/gh/flex-development/rice-action/branch/main/graph/badge.svg?token=rtL6IuEtDK)](https://codecov.io/gh/flex-development/rice-action)
[![module type: esm](https://img.shields.io/badge/module%20type-esm-brightgreen)](https://github.com/voxpelli/badges-cjs-esm)
[![license](https://img.shields.io/github/license/flex-development/rice-action.svg)](LICENSE.md)
[![conventional commits](https://img.shields.io/badge/-conventional%20commits-fe5196?logo=conventional-commits&logoColor=ffffff)](https://conventionalcommits.org/)
[![typescript](https://img.shields.io/badge/-typescript-3178c6?logo=typescript&logoColor=ffffff)](https://typescriptlang.org/)
[![vitest](https://img.shields.io/badge/-vitest-6e9f18?style=flat&logo=vitest&logoColor=ffffff)](https://vitest.dev/)
[![yarn](https://img.shields.io/badge/-yarn-2c8ebb?style=flat&logo=yarn&logoColor=ffffff)](https://yarnpkg.com/)

Repository infrastructure as code

## Contents

- [What is this?](#what-is-this)
- [When should I use this?](#when-should-i-use-this)
- [Use](#use)
- [API](#api)
- [Types](#types)
- [Contribute](#contribute)

## What is this?

GitHub Action for managing repository infrastructure.

## When should I use this?

This action can be used to manage repository infrastructure.

The following setting groups are supported:

- [Branch protection][1]
- [Deployment environments][2]
- [Labels][3]
- [Repositories][4]
- [Team repository permissions][5]

## Use

```yaml
- uses: flex-development/rice-action@<VERSION>
  with:
    # Location of repository infrastructure configuration file
    # default: .github/infrastructure.yml
    config: .github/infrastructure.yml
    # Personal access token (PAT) used to authenticate GitHub API requests
    # default: ${{ github.token }}
    token: ${{ secrets.PAT_REPO }}
```

## API

**TODO**: api documentation.

## Types

This action is fully typed with [TypeScript][6].

## Contribute

See [`CONTRIBUTING.md`](CONTRIBUTING.md).

[1]: https://docs.github.com/rest/branches/branch-protection#update-branch-protection
[2]: https://docs.github.com/rest/deployments/environments#create-or-update-an-environment
[3]: https://docs.github.com/rest/issues/labels
[4]: https://docs.github.com/rest/repos/repos#update-a-repository
[5]: https://docs.github.com/rest/teams/teams#add-or-update-team-repository-permissions
[6]: https://www.typescriptlang.org/
