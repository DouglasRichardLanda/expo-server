#!/bin/bash

while true; do
  docker logs -f --tail 20 exposerver
done
