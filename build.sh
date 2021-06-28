#!/usr/bin/env bash
set -e

PATH="/usr/local/bin"

git pull origin main
npm install
node_modules/.bin/grunt lunr-index
rm -rf public/
hugo --minify