#!/bin/bash

if [[ $TRAVIS_COMMIT_MESSAGE = *"[skip deploy]"* ]]; then
  echo "---> Skipping deploy"
  exit 0
fi

curl -X POST https://${OPENSHIFT_DOMAIN_PORT}/oapi/v1/namespaces/rit-class-stats/buildconfigs/web/webhooks/${OPENSHIFT_WEBHOOK_SECRET}/generic
