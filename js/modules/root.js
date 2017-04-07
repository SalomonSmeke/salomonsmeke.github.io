'use strict';

import {
  spawn_module as spawn_module,
  load as load
} from "./_module.js";
import {common as libListeners} from "../lib/listeners.js";
import {module_def as helpPopup} from "./helpPopup.js";
import {module_def as nav} from "./nav.js";
import {module_def as bars} from "./bars.js";

/*
 * root.js
 * Pseudo module containing the initial portions of the app.
 * Saves me some imports in the entry point.
 */

let module_def = spawn_module({
  id: 'root',
  LOAD: [
    () => {load(helpPopup);},
    () => {load(nav);},
    () => {load(bars);}
  ]
});

export { module_def };
