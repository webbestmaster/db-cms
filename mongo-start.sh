#!/bin/bash

mkdir ./db/db-1
mkdir ./db/db-2
mkdir ./db/db-3
mkdir ./db/db-4

mongod --config ./mongodb-1.config
mongod --config ./mongodb-2.config
mongod --config ./mongodb-3.config
mongod --config ./mongodb-4.config
