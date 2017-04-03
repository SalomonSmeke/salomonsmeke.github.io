"use strict";

import {context as ctx} from "./lib/globals.js";
import {
  hatchListeners as hatchListeners,
  incubateListener as incubateListener,
  common as libListeners
} from "./lib/listeners.js";
import * as helpers from "./lib/helpers.js";
import {load as loadModule, unload as unloadModule} from "./modules/_module.js";
import {build as buildngon} from "./lib/ngon.js";
import {module_def as bars} from "./modules/bars.js";

//Execution. Nothing here is final.
buildngon(2, 'previous');
buildngon(5, 'next');

hatchListeners([
  incubateListener('help-nav', (_ctx) => {
    let toggle = _ctx.props.toggle;
    let node = document.getElementById('help-popup');
    if (toggle) { helpers.addNodeClass(node, 'hidden'); }
    else { helpers.removeNodeClass(node, 'hidden'); }
    _ctx.props.toggle = !toggle;
  }, 'click'),
  incubateListener('help-popup', (_ctx, ctx) => {
    let toggle = ctx.listeners['help-nav'].props.toggle;
    let node = document.getElementById(_ctx.id);
    if (toggle) { helpers.addNodeClass(node, 'hidden'); }
    else { helpers.removeNodeClass(node, 'hidden'); }
    ctx.listeners['help-nav'].props.toggle = !toggle;
  }, 'click'),
  incubateListener('previous',
    libListeners.navHover, 'mouseover'),
  incubateListener('next',
    libListeners.navHover, 'mouseover'),
  incubateListener('previous', () => {
    print('previous');
  }, 'click'),
  incubateListener('next', () => {
    print('next');
  }, 'click')
], 'root');

//No-js banner removal
document
.getElementById("loader-wrapper")
.parentNode
.removeChild(document.getElementById("loader-wrapper"));

loadModule(bars);
