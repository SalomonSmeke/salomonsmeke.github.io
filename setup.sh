#!/bin/bash
# Minimal environment setup. DO NOT USE IF YOU HAVE NODE INSTALLED VIA NOT NVM.

# Colors used for user feedback. NC = no color.
NC='\033[0m';
FAIL='\033[1;31m';
WARN='\033[1;33m';
INFO='\033[1;35m';
SUCCESS='\033[1;32m';
EXTRA='\033[1;37m';

# Do not run if there is a pending uninstall, we dont want to mess up the rollback.
[ -s "./uninstall.sh" ] && {
  echo -e "${FAIL}Found abandoned uninstall script.";
  echo -e "${INFO}If you dont care about rollback: 'rm ./uninstall.sh;'";
  echo -e "If you do care about rollback, but dont have any other projects depending on the items listed in: ./uninstall.sh, do:
      './uninstall.sh; rm ./uninstall.sh;'";
  echo -e "${FAIL}Aborting...${NC}";
  exit;
};

# Create the uninstall script file.
touch 'uninstall.sh';
echo '#!/bin/bash' >> ./uninstall.sh;

# Install brew if it isnt already. Add the rollback steps to uninstall.
[ ! -f "$(which brew)" ] && {
  echo -e "${WARN}Homebrew not found, installing...${NC}";
  /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)";
  echo -e "/usr/bin/ruby -e \"$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/uninstall)\";" >> ./uninstall.sh;
};

# If nvm does not evaluate, it could mean a ton of things...
[ -z "$(which nvm)" ] && {
  # NVM might not be installed. Do that and add rollback.
  if ! (brew ls nvm > /dev/null;) then
    echo -e "${WARN}NVM not found, installing...${NC}";
    brew install nvm;
    echo -e '# Uninstall NVM.
brew uninstall nvm;' >> ./uninstall.sh;
  fi
  # NVM might be installed but not configured on the user's login scripts.
  [ -z $NVM_DIR ] && {
    echo -e "${INFO}Exporting NVM_DIR...${NC}";
    export NVM_DIR="${HOME}/.nvm";
  };
  # NVM might be installed fine but not activated in the user's login scripts.
  [ -s "/usr/local/opt/nvm/nvm.sh" ] && {
    echo -e "${INFO}Activating NVM...${NC}";
    . "/usr/local/opt/nvm/nvm.sh";
  };
  # NVM might be installed inproperly.
  [ ! -s "/usr/local/opt/nvm/nvm.sh" ] && {
    echo -e "${FAIL}NVM not found in NVM_DIR, aborting...${NC}";
    exit;
  };
};

# Install stable node: makes uninstalling rougher here without a set version. But we want bleeding edge.
echo -e "${INFO}Installing stable node branch inoccuous if you have it.${NC}" && nvm install stable;

# If libpng is not installed, install it. For webpack image loader.
[ -z "$(which libpng)" ] && {
    echo -e "${WARN}libpng not found, installing...${NC}";
    brew install libpng;
    echo -e '# Uninstall libpng.
brew uninstall libpng;' >> ./uninstall.sh;
};

# Activate node using nvm.
echo -e "${INFO}Activating stable node.${NC}" && nvm use --delete-prefix stable > /dev/null;

# Install local packages.
echo -e "${INFO}Installing local NPM packages${NC}";
npm install;

# What to add to the user's login scripts.
SOURCE="export NVM_DIR='${HOME}/.nvm'; . '/usr/local/opt/nvm/nvm.sh'; # Added by ssmeke.io setup.";

# The SED parameters to match with the above, used for the uninstall script.
SED_SOURCE="/${SOURCE//\//\\/}/d";

# Add NVM stuff to the user's login scripts. Add the rollback to uninstall.sh.
[ -s "$HOME/.zshrc" ] && {
  if ! grep -q "${SOURCE}" "$HOME/.zshrc"; then
    echo -e "${INFO}Adding NVM activation to .zshrc${NC}";
    echo -e "# Remove the NVM activation stuff from your .zshrc
sed -i.old \"${SED_SOURCE}\" \"$HOME/.zshrc\";" >> uninstall.sh;
    echo -e "    echo -e '${INFO}Backed up .zshrc at: ${HOME}/.zshrc.old${NC}';" >> uninstall.sh;
    echo -e "${SOURCE}" >> "$HOME/.zshrc";
  fi
};
# Fallback if theyre not on zsh (ew).
[ ! -s "$HOME/.zshrc" ] && {
  if ! grep -q "${SOURCE}" "$HOME/.bash_profile"; then
    echo -e "${INFO}Adding NVM activation to .bash_profile${NC}";
    echo -e "# Remove the NVM activation stuff from your .bash_profile
sed -i.old \"${SED_SOURCE}\" \"$HOME/.bash_profile\";" >> uninstall.sh;
    echo -e "    echo -e '${INFO}Backed up .bash_profile at: ${HOME}/.bash_profile.old${NC}';" >> uninstall.sh;
    echo -e "${SOURCE}" >> "$HOME/.bash_profile";
  fi
};

# Make uninstall executable if we built it. No typo.
[ -s "./uninstall.sh" ] && {
  echo -e "# Back this script up.
cat ./uninstall.sh >> uninstall.sh.consumed;
# Meta levels increasing.
echo -e '${INFO}Made a copy of the uninstall script so you can see side-effects: uninstall.sh.consumed.${NC}';
# Delet this.
rm ./uninstall.sh;

#####INSTALLED ON: $(date)#####" >> uninstall.sh;
  chmod +x uninstall.sh;
}

# Delete the uninstall executable if it is empty.
[ ! -s "./uninstall.sh" ] && {
  rm ./uninstall.sh > /dev/null;
}

# Give feedback.
echo -e "${SUCCESS}SUCCESS! You might need to reopen your terminal session.${EXTRA}
  'added an uninstall.sh file which can undo the changes done here. LOOK BEFORE RUNNING.'
  'source activate' to activate.
  'open build/index.html' to open.${NC}";
