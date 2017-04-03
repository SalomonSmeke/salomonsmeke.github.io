'use strict';

import {base_module as base_module} from "./_module.js";
import {common as libListeners} from "../lib/listeners.js";
import * as _ from "../lib/minidash.js";
import {build as buildngon} from "../lib/ngon.js";

/*
 * root.js
 * Pseudo module containing the initial portions of the app.
 * Ideally these should go in their own modules, or loaded in by loading this one.
 * TODO: That^
 */

let module_def = base_module();
module_def.LOAD = [
  () => {buildngon(1, 'previous');},
  () => {buildngon(3, 'next');}
];
module_def.LISTENERS = [
  {
    id: 'help-nav',
    f: (_ctx) => {
      const toggle = _ctx.props.toggle;
      let node = document.getElementById('help-popup');
      if (toggle) { _.addNodeClass(node, 'hidden'); }
      else { _.removeNodeClass(node, 'hidden'); }
      _ctx.props.toggle = !toggle;
    },
    type: 'click'
  },
  {
    id: 'help-popup',
    f: (_ctx, ctx) => {
      const toggle = ctx.listeners['help-nav'].props.toggle;
      let node = document.getElementById(_ctx.id);
      if (toggle) { _.addNodeClass(node, 'hidden'); }
      else { _.removeNodeClass(node, 'hidden'); }
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
