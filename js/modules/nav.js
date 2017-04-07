'use strict';

import {base_module as base_module} from "./_module.js";
import {common as libListeners} from "../lib/listeners.js";
import {build as buildngon} from "../lib/ngon.js";

/*
 * nav.js
 * Module exposing/building navigation interactors.
 */

let module_def = base_module();
module_def.LOAD = [
  () => {buildngon(1, 'previous');},
  () => {buildngon(3, 'next');}
];
module_def.LISTENERS = [
  {
    id: 'previous',
    f: libListeners.navHover,
    type: 'mouseover'
  },
  {
    id: 'next',
    f: libListeners.navHover,
    type: 'mouseover'
  }
];
module_def.id = 'nav';

export { module_def };
