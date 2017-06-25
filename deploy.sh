#!/bin/bash

# Simple deploy script.

rm -rf ./git_staging && rm -rf ./build; # Just in case.

mkdir git_staging && cp -R .git git_staging/; # Set up staging folder.

cd git_staging && git checkout master; # Checkout master in staging folder.

git fetch || { echo "FAIL, check your internet connection." ; exit; }; # Fail if no fetch.

git reset --hard origin/master;

cd ..;

. "/usr/local/opt/nvm/nvm.sh";
source activate;
gulp build-deploy; # Create built site.

cp -R git_staging/.git build/; # Copy the git state to build.

version=$(cat ver.txt);
date=$(date);

cd build && git add -A; # Stage files.

git commit -m "Deployed: ${version} ON ${date}." && git push origin master; # Commit and deploy.

cd .. && rm -rf ./git_staging && rm -rf ./build; # Clean-up.

gulp; # Leave things ready to go.

echo "Done!";
