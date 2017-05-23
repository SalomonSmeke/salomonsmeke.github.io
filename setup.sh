# Minimal environment setup. DO NOT USE IF YOU HAVE NODE INSTALLED VIA NOT NVM.

NC='\033[0m';
WARN='\033[1;33m';
INFO='\033[1;35m';
SUCCESS='\033[1;32m';
EXTRA='\033[1;37m';


[ ! -f "`which brew`" ] && {
  echo "${WARN}Homebrew not found, installing...${NC}";
  /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)";
};
[ -z "`which nvm`" ] && {
  if ! (brew ls nvm > /dev/null;) then
    echo "${WARN}NVM not found, installing...${NC}";
    brew install nvm;
  fi
  [ -z $NVM_DIR ] && {
    echo "${INFO}Exporting NVM_DIR...${NC}";
    export NVM_DIR="$(brew --prefix nvm)";
  };
  [ -s "$NVM_DIR/nvm.sh" ] && {
    echo "${INFO}Activating NVM...${NC}";
    . "$NVM_DIR/nvm.sh";
  };
};
echo "${INFO}Installing stable node branch inoccuous if you have it.${NC}" && nvm install stable;
echo "${INFO}Activating stable node.${NC}" && nvm use --delete-prefix stable > /dev/null;
[ ! -f "`which yarn`" ] && {
  echo "${WARN}No global yarn found, installing...${NC}";
  npm install -g yarn;
};
[ ! -f "`which gulp`" ] && {
  echo "${WARN}No global gulp found, installing...${NC}";
  npm install -g gulp-cli;
};
yarn install;
echo "${SUCCESS}SUCCESS!${EXTRA}
  'nvm use --delete-prefix stable' to activate.
  './setup_editor.sh' to setup atom. // TODO
  'gulp' to build.
  'open build/index.html' to open.${NC}";
