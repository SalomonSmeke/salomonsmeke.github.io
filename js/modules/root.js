'use strict';

import {base_module as base_module} from "./_module.js";
import {context as ctx} from "../lib/globals.js";
import {common as libListeners} from "../lib/listeners.js";
import * as helpers from "../lib/helpers.js";
import {build as buildngon} from "../lib/ngon.js";

/*
 * root.js
 * Pseudo module containing the initial portions of the app.
 * Ideally these should go in their own modules, or loaded in by loading this one.
 * TODO: That^
 */

let module_def = base_module();
module_def.DOM_MANIPULATION = [
  () => {buildngon(2, 'previous');},
  () => {buildngon(5, 'next');}
];
module_def.LISTENERS = [
  {
    id: 'help-nav',
    f: (_ctx) => {
      const toggle = _ctx.props.toggle;
      let node = document.getElementById('help-popup');
      if (toggle) { helpers.addNodeClass(node, 'hidden'); }
      else { helpers.removeNodeClass(node, 'hidden'); }
      _ctx.props.toggle = !toggle;
    },
    type: 'click'
  },
  {
    id: 'help-popup',
    f: (_ctx, ctx) => {
      const toggle = ctx.listeners['help-nav'].props.toggle;
      let node = document.getElementById(_ctx.id);
      if (toggle) { helpers.addNodeClass(node, 'hidden'); }
      else { helpers.removeNodeClass(node, 'hidden'); }
      ctx.listeners['help-nav'].props.toggle = !toggle;
    },
    type: 'click'
  },
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
module_def.id = 'root';

export { module_def };
