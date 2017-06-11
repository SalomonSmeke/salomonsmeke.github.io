import { spawn_module } from './_module';
import * as _ from '../lib/minidash';

/*
 * helpPopup.js
 * Module for the help-popup
 */

const module_def = spawn_module({
  id: 'helpPopup',
  LISTENERS: [
    {
      id: 'help-nav',
      f: (local_ctx) => {
        const toggle = local_ctx.props.toggle;
        const node = document.getElementById('help-popup');
        if (toggle) _.addNodeClass(node, 'hidden'); else _.removeNodeClass(node, 'hidden');
        local_ctx.props.toggle = !toggle;
      },
      type: 'click'
    },
    {
      id: 'help-popup',
      f: (local_ctx, sibling_ctx) => {
        const toggle = sibling_ctx['help-nav'].props.toggle;
        const node = document.getElementById(local_ctx.id);
        if (toggle) _.addNodeClass(node, 'hidden'); else _.removeNodeClass(node, 'hidden');
        sibling_ctx['help-nav'].props.toggle = !toggle;
      },
      type: 'click'
    }
  ]
});

export { module_def as default };
