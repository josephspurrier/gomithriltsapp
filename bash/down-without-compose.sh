#!/bin/sh

# This script will shutdown the containers for the application without docker-compose.

docker rm gomithriltsapp -f
docker rm mysql57 -f