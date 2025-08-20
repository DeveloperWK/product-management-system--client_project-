#!/bin/sh
set -e
echo "Running migrations..."
pnpm db:migrate
