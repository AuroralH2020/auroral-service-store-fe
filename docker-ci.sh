#!/bin/bash

if [ $1 = "back" ]
then
  (docker image rm $2 || echo "Image not found") &&
  docker build -t $2 --build-arg TAG=fermium-alpine3.12 . &&
  docker push $2
fi

if [ $1 = "front" ]
then
  (docker image rm $2 || echo "Image not found") &&
  node set-env.js develop && docker build -t $2 --build-arg BRANCH=develop --build-arg BUILD=prod . &&
  docker push $2
fi
