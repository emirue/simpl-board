#!/usr/bin/env bash

export ROOT_URL=http://localhost:9100
export CLUSTER_WORKERS_COUNT=0
export NEVER_DIE=0

pushd ./webapp
meteor npm install

MODE="run"

if [[ ! -z "$2" ]]; then
  MODE="$2"
fi

case $1 in

  user)
  export TEST_CLIENT=0
  export TEST_WATCH=1
  export TEST_BROWSER_DRIVER=chrome
  meteor user --driver-package=meteortesting:mocha --settings=dev_settings.json --raw-logs --port=3200
  ;;

  reset)
  meteor reset
  meteor ${MODE} --port=9100 --settings=dev_settings.json --raw-logs
  ;;

  local)
  meteor ${MODE} --port=9100 --settings=dev_settings.json --raw-logs
  ;;

  *)
  ## local DB
  meteor ${MODE} --port=9100 --settings=dev_settings.json --raw-logs
  ;;

esac
