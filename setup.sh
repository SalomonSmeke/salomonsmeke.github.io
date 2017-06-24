# Minimal environment setup. DO NOT USE IF YOU HAVE NODE INSTALLED VIA NOT NVM.

NC='\033[0m';
FAIL='\033[1;31m';
WARN='\033[1;33m';
INFO='\033[1;35m';
SUCCESS='\033[1;32m';
EXTRA='\033[1;37m';

[ -s "./uninstall.sh" ] && {
  echo "${FAIL}Found abandoned uninstall script, aborting...${NC}";
  exit;
};

touch 'uninstall.sh';

[ ! -f "`which brew`" ] && {
  echo "${WARN}Homebrew not found, installing...${NC}";
  /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)";
  echo '/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/uninstall)";' >> ./uninstall.sh;
};
[ -z "`which nvm`" ] && {
  if ! (brew ls nvm > /dev/null;) then
    echo "${WARN}NVM not found, installing...${NC}";
    brew install nvm;
    echo 'brew uninstall nvm;' >> ./uninstall.sh;
  fi
  [ -z $NVM_DIR ] && {
    echo "${INFO}Exporting NVM_DIR...${NC}";
    export NVM_DIR="${HOME}/.nvm";
  };
  [ -s "/usr/local/opt/nvm/nvm.sh" ] && {
    echo "${INFO}Activating NVM...${NC}";
    . "/usr/local/opt/nvm/nvm.sh";
  };
  [ ! -s "/usr/local/opt/nvm/nvm.sh" ] && {
    echo "${FAIL}NVM not found in NVM_DIR, aborting...${NC}";
    exit;
  };
};
echo "${INFO}Installing stable node branch inoccuous if you have it.${NC}" && nvm install stable;
echo "${INFO}Activating stable node.${NC}" && nvm use --delete-prefix stable > /dev/null;
[ ! -f "`which ncu`" ] && {
  echo "${WARN}No global ncu found, installing...${NC}";
  if ! grep -q "brew uninstall nvm;" "./uninstall.sh"; then
    echo '. /usr/local/opt/nvm/nvm.sh && nvm use --delete-prefix stable && npm uninstall -g npm-check-updates;' >> ./uninstall.sh;
  fi
  npm install -g npm-check-updates;
};
[ ! -f "`which gulp`" ] && {
  echo "${WARN}No global gulp found, installing...${NC}";
  if ! grep -q "brew uninstall nvm;" "./uninstall.sh"; then
    echo '. /usr/local/opt/nvm/nvm.sh && nvm use --delete-prefix stable && npm uninstall -g gulp-cli;' >> ./uninstall.sh;
  fi
  npm install -g gulp-cli;
};
npm install;

SOURCE="export NVM_DIR='${HOME}/.nvm'; . '/usr/local/opt/nvm/nvm.sh';";
SED_SOURCE="/export NVM_DIR='${HOME//\//\\/}\/.nvm'; . '\/usr\/local\/opt\/nvm\/nvm.sh';/d";

[ -s "$HOME/.zshrc" ] && {
  if ! grep -q "${SOURCE}" "$HOME/.zshrc"; then
    echo "${INFO}Adding NVM activation to .zshrc${NC}";
    echo "sed -i.old \"${SED_SOURCE}\" \"$HOME/.zshrc\";" >> uninstall.sh;
    echo "echo 'Backed up .zshrc at: ${HOME}/.zshrc.old';" >> uninstall.sh;
    echo "${SOURCE}" >> "$HOME/.zshrc";
  fi
};
[ ! -s "$HOME/.zshrc" ] && {
  if ! grep -q "${SOURCE}" "$HOME/.bash_profile"; then
    echo "${INFO}Adding NVM activation to .bash_profile${NC}";
    echo "sed -i.old \"${SED_SOURCE}\" \"$HOME/.bash_profile\";" >> uninstall.sh;
    echo "echo 'Backed up .bash_profile at: ${HOME}/.bash_profile.old';" >> uninstall.sh;
    echo "${SOURCE}" >> "$HOME/.bash_profile";
  fi
};
chmod +x uninstall.sh;
echo "${SUCCESS}SUCCESS! You might need to reopen your terminal session.${EXTRA}
  'added an uninstall.sh file which can undo the changes done here. LOOK BEFORE RUNNING.'
  'source activate' to activate.
  './setup_atom.sh' to setup atom.
  'gulp' to build.
  'open build/index.html' to open.${NC}";
