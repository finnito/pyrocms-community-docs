#!/usr/bin/env bash
set -e

npm install
node_modules/.bin/grunt lunr-index
rm -rf public/
hugo