# :rice: rice-action

[![github release](https://img.shields.io/github/release/flex-development/rice-action.svg?logo=github)](https://github.com/flex-development/rice-action/releases/latest)
[![github marketplace](https://img.shields.io/badge/marketplace-rice--action-blue?logo=github)](https://github.com/marketplace/actions/rice-action)
[![infrastructure](https://github.com/flex-development/rice-action/actions/workflows/infrastructure.yml/badge.svg)](https://github.com/flex-development/rice-action/actions/workflows/infrastructure.yml)
[![codecov](https://codecov.io/gh/flex-development/rice-action/branch/main/graph/badge.svg?token=rtL6IuEtDK)](https://codecov.io/gh/flex-development/rice-action)
[![module type: esm](https://img.shields.io/badge/module%20type-esm-brightgreen)](https://github.com/voxpelli/badges-cjs-esm)
[![sponsor](https://img.shields.io/badge/sponsor-flex--development-blue.svg?logo=github)](https://github.com/sponsors/flex-development)
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
- [Scenarios](#scenarios)
  - [Admin-only infrastructure updates](#admin-only-infrastructure-updates)
- [API](#api)
  - [Inputs](#inputs)
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

## Scenarios

### Admin-only infrastructure updates

Update repository infrastructure on `push` or `workflow_dispatch` when the infrastructure config file (or workflow) is
updated. The user triggering the workflow run (`github.actor`) must be a repository admin.

See [`.github/workflows/infrastructure.yml`](.github/workflows/infrastructure.yml) for more details.

```yaml
---
name: infrastructure
on:
  create:
    branches:
      - main
  push:
    branches:
      - main
      - release/**
    paths:
      - .github/infrastructure.yml
      - .github/workflows/infrastructure.yml
  workflow_dispatch:
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
jobs:
  infrastructure:
    runs-on: ubuntu-latest
    steps:
      - id: debug
        name: Print environment variables and event payload
        uses: hmarr/debug-action@v2.1.0
      - id: check-actor-permission
        name: Check permission of actor ${{ github.actor }}
        uses: actions-cool/check-user-permission@v2.2.0
        with:
          require: admin
          username: ${{ github.actor }}
      - id: checkout
        name: Checkout ${{ github.ref_name }}
        uses: actions/checkout@v3.3.0
        with:
          persist-credentials: false
          ref: ${{ github.ref_name }}
      - id: update
        if: steps.check-actor-permission.outputs.require-result == 'true'
        name: Update repository infrastructure
        uses: flex-development/rice-action@<VERSION>
        with:
          token: ${{ secrets.PAT_REPO }}
```

## API

### Inputs

#### `config`

Location of repository infrastructure configuration file.

> **Default**: `.github/infrastructure.yml`

#### `token`

Personal access token (PAT) used to authenticate GitHub API requests.

> **Default**: `${{ github.token }}`

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
