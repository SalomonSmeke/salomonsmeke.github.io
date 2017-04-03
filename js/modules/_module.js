'use strict';

import * as window from "../lib/window.js";
import {
  hatchListeners as hatchListeners,
  incubateListener as incubateListener,
  removeOwnerListeners as removeOwnerListeners
} from "../lib/listeners.js";

function base_module() {
  return {
    id: '',
    LOAD: [],
    UNLOAD: [],
    LISTENERS: [],
    WINDOW_EXPOSE: []
  };
}

function load(module_def) {
  subRoutines(module_def.LOAD, module_def.id);
  addListeners(module_def.LISTENERS, module_def.id);
  if (Object.keys(module_def.WINDOW_EXPOSE).length) {
    expose(module_def.WINDOW_EXPOSE, module_def.id);
  }
}

function unload(module_def) {
  subRoutines(module_def.UNLOAD, module_def.id);
  if (module_def.LISTENERS.length) {
    removeListeners(module_def.id);
  }
  if (Object.keys(module_def.WINDOW_EXPOSE).length) {
    obscure(module_def.id);
  }
}

function subRoutines(sr, caller) { sr.forEach((r) => { r(caller); }); }
function addListeners(e, id) {
  const eggs = e.map((l) => { return incubateListener(l.id, l.f, l.type); });
  hatchListeners(eggs, id);
}
function removeListeners(id) { removeOwnerListeners(id); }
function expose(o, id) { window.exposeObject(o, id); }
function obscure(id) { window.obscureObject(id); }

export {base_module, load, unload};
