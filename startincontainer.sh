#!/bin/bash

cd /app
if [ ! -d node_modules ] ;
then
    npm ci
fi
npm run build-stage
npm run start