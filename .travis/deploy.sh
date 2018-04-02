#!/bin/bash

set -e

if [[ $TRAVIS_COMMIT_MESSAGE = *"[skip deploy]"* ]]; then
  echo "---> Skipping deploy"
  exit 0
fi

author_name=$(git --no-pager show -s --format='%an' $TRAVIS_COMMIT)
author_email=$(git --no-pager show -s --format='%ae' $TRAVIS_COMMIT)
committer_name=$(git --no-pager show -s --format='%cn' $TRAVIS_COMMIT)
committer_email=$(git --no-pager show -s --format='%ce' $TRAVIS_COMMIT)

cat >payload_file.yaml <<EOL
git:
  uri: "https://github.com/${TRAVIS_REPO_SLUG}"
  ref: "${TRAVIS_BRANCH}"
  commit: "${TRAVIS_COMMIT}"
  author:
    name: "${author_name}"
    email: "${author_email}"
  committer:
    name: "${committer_name}"
    email: "${committer_email}"
  message: "${TRAVIS_COMMIT_MESSAGE}"
EOL

echo "---> Webhook payload:"
cat payload_file.yaml

echo "---> Posting to webhook ..."

curl -X POST https://${OPENSHIFT_DOMAIN_PORT}/oapi/v1/namespaces/rit-class-stats/buildconfigs/web/webhooks/${OPENSHIFT_WEBHOOK_SECRET}/generic \
  -H "Content-Type: application/yaml" \
  --data-binary @payload_file.yaml > /dev/null
