#!/bin/bash

# We need to install dependencies only for Docker
echo "Checking if we are in docker..."
[[ ! -e /.dockerenv ]] && exit 0

set -xe

echo "Looks like we are in docker..."

# Run npm and yarn to install dependencies
npm config set registry http://registry.npmjs.org/
npm install
yarn install
