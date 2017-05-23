# Minimal environment setup. DO NOT USE IF YOU HAVE NODE INSTALLED VIA NOT NVM.

[ ! -f "`which brew`" ] && {
  echo "Homebrew not found, installing...";
  /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)";
};
[ -z "`which nvm`" ] && {
  if ! (brew ls nvm > /dev/null;) then
    echo "NVM not found, installing...";
    brew install nvm;
  fi
  [ -z $NVM_DIR ] && {
    echo "Exporting NVM_DIR...";
    export NVM_DIR="$(brew --prefix nvm)";
  };
  [ -s "$NVM_DIR/nvm.sh" ] && {
    echo "Activating NVM...";
    . "$NVM_DIR/nvm.sh";
  };
};
echo "Installing stable node branch.";
nvm install stable;
echo "Enabling stable node.";
nvm use --delete-prefix stable > /dev/null;
[ ! -f "`which yarn`" ] && {
  echo "No global yarn found, installing...";
  npm install -g yarn;
};
[ ! -f "`which gulp`" ] && {
  echo "No global gulp found, installing...";
  npm install -g gulp-cli;
};
yarn install;
echo "Do: nvm use --delete-prefix stable to activate."
