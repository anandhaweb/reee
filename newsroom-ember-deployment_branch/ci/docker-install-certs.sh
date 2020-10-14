#!/bin/bash

# Easier to install DOI certs in container 
[[ ! -e /.dockerenv ]] && exit 0

set -xe

cp ci/DOICERTS/*.crt  /usr/local/share/ca-certificates/
chmod 644 /usr/local/share/ca-certificates/*.crt && update-ca-certificates

echo "Testing certs "

curl https://www.google.com
