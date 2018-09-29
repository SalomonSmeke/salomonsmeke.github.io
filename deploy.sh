#!/bin/bash

# Colors used for user feedback. NC = no color.
NC="\033[0m";
FAIL="\033[1;31m";
WARN='\033[1;33m';
INFO="\033[1;35m";
SUCCESS="\033[1;32m";
EXTRA="\033[1;37m";

STAGING_FOLDER="git_staging";
BUILD_FOLDER="dist";
LOGFILE="deploy_log.txt";

# Deploy script.
LOGPATH="$(pwd)/${LOGFILE}";

clean_up() {
  printf "${EXTRA}Cleaning up folders...${NC}";
  if [ $1 -gt 0 ]; then
    popd >> "${LOGPATH}" 2>&1 || exit 1;
  fi;

  rm -rf "./${STAGING_FOLDER}" >> "${LOGPATH}" 2>&1;
  rm -rf "./${BUILD_FOLDER}" >> "${LOGPATH}" 2>&1;

  printf "${SUCCESS} \xE2\x9C\x94\n${NC}";
};

printf "Deploy to master...\n";

# TODO: Run tests.

printf "${EXTRA}Verifying branch is dev...${NC}";

branch="$(git branch | grep '\*' | cut -d ' ' -f2)";

if [ "$branch" != "dev" ]; then
  printf "${FAIL} \xE2\x9C\x98\n\tNot on ${WARN}dev${FAIL} branch, cannot deploy from ${WARN}${branch}${FAIL} branch.${NC}\n";
  exit 1;
fi;

printf "${SUCCESS} \xE2\x9C\x94\n${NC}";

clean_up 0; # Clean folders.

printf "${EXTRA}Setting up folders...${NC}";

mkdir "${STAGING_FOLDER}" && cp -R .git "${STAGING_FOLDER}/"; # Set up staging folder.

printf "${SUCCESS} \xE2\x9C\x94\n${NC}";

pushd "$(pwd)" >> "${LOGPATH}" 2>&1  || exit 1; # Save current directory.

printf "${EXTRA}Doing git-fu...${NC}";

cd "${STAGING_FOLDER}" && git checkout master >> "${LOGPATH}" 2>&1; # Checkout master in staging folder.

git fetch >> "${LOGPATH}" 2>&1 || {
  printf "${FAIL} \xE2\x9C\x98\n\t${NC}";

  clean_up 1;

  printf "${FAIL}Could not git fetch, check your internet connection.\n${NC}";

  exit 1;
}; # Fail if no fetch.

git reset --hard origin/master >> "${LOGPATH}" 2>&1 || {
  printf "${FAIL} \xE2\x9C\x98\n\t${NC}";

  clean_up 1;

  printf "${FAIL}Could not git reset, check your git state.\n${NC}";

  exit 1;
}; # Fail if no reset.

printf "${SUCCESS} \xE2\x9C\x94\n${NC}";

popd >> "${LOGPATH}" 2>&1 || exit 1; # Pop directory.

printf "${INFO}Building site...${NC}";

source "/usr/local/opt/nvm/nvm.sh";
nvm use stable || {
  printf "${FAIL} \xE2\x9C\x98\n\t${NC}";

  clean_up 0;

  printf "${FAIL}Could not activate npm, check ${INFO}nvm${FAIL}.\n${NC}";

  exit 1;
};

npm run prod:build || {
  printf "${FAIL} \xE2\x9C\x98\n\t${NC}";

  clean_up 0;

  printf "${FAIL}Could not build, try ${INFO}npm run build;${FAIL}.\n${NC}";

  exit 1;
};

printf "${SUCCESS} \xE2\x9C\x94\n${NC}";

printf "${INFO}More git-fu...${NC}";

cp -R "${STAGING_FOLDER}/.git" "${BUILD_FOLDER}/"; # Copy the git state to build.

printf "${SUCCESS} \xE2\x9C\x94\n${NC}";

printf "${INFO}Retrieving site version and build date...${NC}";

version=$(awk '/version/ {print $2; exit;}' package.json | sed s/[\",\s]//g)
date=$(date);

printf "${SUCCESS} \xE2\x9C\x94\n${NC}";

pushd "$(pwd)" >> "${LOGPATH}" 2>&1 || exit 1;

printf "${EXTRA}Staging build...${NC}";

cd dist && git add -A >> "${LOGPATH}" 2>&1; # Stage files.

printf "${SUCCESS} \xE2\x9C\x94\n${NC}";

printf "${INFO}Pushing...${NC}";

git commit -m "Deployed: ${version} ON ${date}." >> "${LOGPATH}" 2>&1 || {
  printf "${FAIL} \xE2\x9C\x98\n\t${NC}";

  clean_up 1;

  printf "${FAIL}Could not commit build.${NC}\n";

  exit 1;
}; # Commit.

git push origin master >> "${LOGPATH}" 2>&1 || {
  printf "${FAIL} \xE2\x9C\x98\n\t${NC}";

  clean_up 1;

  printf "${FAIL}Could not push build, check your network connection.${NC}\n";

  exit 1;
}; # Deploy.

printf "${SUCCESS} \xE2\x9C\x94\n${NC}";

popd >> "${LOGPATH}" 2>&1 || exit 1;

clean_up 0;

printf "${SUCCESS}Done!${NC}";
