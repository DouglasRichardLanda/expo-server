#!/bin/bash
docker build -t exposerver .

docker stop exposerver 2>/dev/null
docker rm exposerver 2>/dev/null

docker run --name exposerver -p 3000:3000 exposerver