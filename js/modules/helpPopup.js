'use strict';

import {spawn_module as spawn_module} from "./_module.js";
import {common as libListeners} from "../lib/listeners.js";
import * as _ from "../lib/minidash.js";

/*
 * helpPopup.js
 * Module for the help-popup
 */

let module_def = spawn_module({
  id: 'helpPopup',
  LISTENERS: [
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
    }
  ]
});

export { module_def };
