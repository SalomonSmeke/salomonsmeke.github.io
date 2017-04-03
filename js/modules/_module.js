'use strict';

import * as window from "../lib/window.js";

function base_module() {
  return {
    DOM_MANIPULATION: [],
    LISTENERS: [],
    WINDOW_EXPOSE: []
  };
}

function load(module_def) {
  //TODO: DOM_MANIPULATION
  //TODO: LISTENERS
  expose(module_def.WINDOW_EXPOSE);
}

function unload() {

}

function expose(o) { window.exposeObject(o); }
function obscure(o) { window.obscureObject(o); }

export {base_module, load};
