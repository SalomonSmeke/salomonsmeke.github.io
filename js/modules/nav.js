'use strict';

import {spawn_module as spawn_module} from "./_module.js";
import {common as libListeners} from "../lib/listeners.js";
import {build as buildngon} from "../lib/nav/ngon.js";
import {start as start_scroll_nav} from "../lib/nav/scrollNav.js";

/*
 * nav.js
 * Module exposing/building navigation interactors.
 */

let module_def = spawn_module({
  id: 'nav',
  LOAD: [
    () => {buildngon(1, 'previous');},
    () => {buildngon(3, 'next');},
    start_scroll_nav
  ],
  LISTENERS: [
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
  ]
});

export { module_def };
