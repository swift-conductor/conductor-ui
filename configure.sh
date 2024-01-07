#!/usr/bin/env bash

# use correct Node version
source ~/.nvm/nvm.sh

# Use Node.JS Iron (v20.*.*)
nvm install --lts=Iron
nvm use --silent --lts=Iron

npm install
