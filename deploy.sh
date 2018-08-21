#!/bin/bash

# Simple deploy script.

rm -rf ./git_staging && rm -rf ./dist; # Just in case.

mkdir git_staging && cp -R .git git_staging/; # Set up staging folder.

cd git_staging && git checkout master; # Checkout master in staging folder.

git fetch || { echo "FAIL, check your internet connection." ; exit; }; # Fail if no fetch.

git reset --hard origin/master;

cd ..;

. "/usr/local/opt/nvm/nvm.sh";
nvm use stable;
npm run build;

cp -R git_staging/.git dist/; # Copy the git state to build.

version=$(cat ver.txt);
date=$(date);

cd dist && git add -A; # Stage files.

git commit -m "Deployed: ${version} ON ${date}." && git push origin master; # Commit and deploy.

cd .. && rm -rf ./git_staging && rm -rf ./dist; # Clean-up.

echo "Done!";
