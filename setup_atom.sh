# Minimal atom setup. Enables proper linters.

NC='\033[0m';
FAIL='\033[1;31m';
WARN='\033[1;33m';
INFO='\033[1;35m';
SUCCESS='\033[1;32m';

[ ! -f "`which atom`" ] && {
  [ ! -f "`which brew`" ] && {
    echo "${WARN}Homebrew not found, installing...${NC}";
    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)";
  };
  "${WARN}Atom not found, installing from cask...${NC}" && brew cask install atom;
};
[ ! -f "`which atom`" ] && {
  echo "${FAIL}FAIL! Please open atom and restart your terminal session before retrying.${NC}";
  exit;
};
[ ! -f "`which apm`" ] && {
  echo "${FAIL}FAIL! Please open atom and restart your terminal session before retrying.${NC}";
  exit;
};
echo "${INFO}Installing atom plugins, inoccuous if you have them.${NC}" && {
  # Base linter stuff
  apm install intentions busy-signal linter linter-ui-default;
  # Linter packages
  apm install linter-csslint linter-eslint linter-tidy;
  # Autocompletes
  apm install autocomplete-json autocomplete-modules;
};
echo "${INFO}Cleaning up atom plugins. Not a big deal if it fails.${NC}" && {
  apm dedupe && DEDUPE_OK=1;
  [ -z $DEDUPE_OK ] && rm npm-debug.log;
};
echo "${SUCCESS}SUCCESS! Here ya go: opening atom...${NC}" && atom .;
