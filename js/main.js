"use strict";

import {
  hatchListeners as hatchListeners,
  incubateListener as incubateListener,
  init as coreinit} from "./lib/core.js";
import * as helpers from "./lib/helpers.js";
import * as commonListeners from "./lib/commonListeners.js";
import {build as buildngon} from "./lib/ngon.js";

//Global context
let ctx = {
  listeners: {}
};

//Execution. Nothing here is final.
coreinit(ctx);

hatchListeners([
  incubateListener('help-nav', (_ctx) => {
    let toggle = _ctx.props.toggle;
    let node = document.getElementById('help-popup');
    if (toggle) { helpers.addNodeClass(node, 'hidden'); }
    else { helpers.removeNodeClass(node, 'hidden'); }
    _ctx.props.toggle = !toggle;
  }, 'onclick'),
  incubateListener('previous',
    commonListeners.navHover, 'onmouseover'),
  incubateListener('next',
    commonListeners.navHover, 'onmouseover'),
  incubateListener('previous', (_ctx) => {
    print('previous');
  }, 'onclick'),
  incubateListener('next', (_ctx) => {
    print('next');
  }, 'onclick'),
], 'root');

buildngon(2, 'previous');
buildngon(5, 'next');

//No-js banner removal
document
.getElementById("loader-wrapper")
.parentNode
.removeChild(document.getElementById("loader-wrapper"));

//unregister listeners
//unregister owner

//Load bars
