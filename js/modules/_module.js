import * as window from '../lib/window';
import {
  hatchListeners,
  incubateListener,
  removeOwnerListeners
} from '../lib/listeners';

function spawn_module(init) {
  const out = {
    id: '',
    LOAD: [],
    UNLOAD: [],
    LISTENERS: [],
    WINDOW_EXPOSE: []
  };
  const keys = init ? Object.keys(init) : [];
  keys.forEach((k) => { out[k] = init[k]; });
  return out;
}

function subRoutines(sr, caller) { sr.forEach(r => r(caller)); }
function addListeners(e, id) {
  const eggs = e.map(l => incubateListener(l.id, l.f, l.type));
  hatchListeners(eggs, id);
}
function removeListeners(id) { removeOwnerListeners(id); }
function expose(o, id) { window.exposeObject(o, id); }
function obscure(id) { window.obscureObject(id); }

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

export { spawn_module, load, unload };
