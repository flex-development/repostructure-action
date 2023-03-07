#!/bin/sh

# Repository Setup
#
# References:
#
# - https://cli.github.com/manual/gh_repo_create
# - https://cli.github.com/manual/gh_repo_edit

description=$(jq -r .description package.json)
homepage=$(jq -r .homepage package.json)
name=$(jq -r .name package.json)
repo=${name:1}
team=dependabot-review

git setup
gh repo create $repo --description="$description" --push --public --source=. --team=$team
gh repo edit $repo --allow-update-branch --default-branch=main --enable-auto-merge --enable-discussions --enable-issues --enable-merge-commit=false --enable-projects --enable-rebase-merge --enable-squash-merge --enable-wiki=false --homepage=$homepage
