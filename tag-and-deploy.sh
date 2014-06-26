#!/bin/bash

# 1. Extracts the version from package.json, tags master with the version.
# 2. Pushes master to origin with tags.
# 3. Pushes subtree to gh-pages

set -o errexit

current_branch=$(git rev-parse --abbrev-ref HEAD)
if [ "$current_branch" != "master" ]; then
echo 'tag-and-deploy.sh should only be run on *master*'
echo "Current branch is *$current_branch*, to change:"
echo 'git checkout master'
exit 1
fi
echo 'Extract the version from package.json'
if [ ! -f './package.json' ]; then
echo "'package.json' is missing from the current dir $PWD"
exit 2
fi

tag=$(node -e 'console.log(require("./package.json").version)')

echo "Tagging master with v$tag"
git tag -a "v$tag" -m "Tagged release $tag" master

echo "Pushing master with tags"
git push --tags origin master

echo "Pushing gh-pages"
git subtree push --prefix dist origin gh-pages
