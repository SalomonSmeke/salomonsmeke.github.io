"use strict";

import {context as ctx} from "./lib/globals.js";
import {
    hatchListeners as hatchListeners,
    incubateListener as incubateListener} from "./lib/core.js";
import * as helpers from "./lib/helpers.js";
import * as commonListeners from "./lib/commonListeners.js";
import {build as buildngon} from "./lib/ngon.js";

window.context = ctx;

//Execution. Nothing here is final.
hatchListeners([
  incubateListener('help-nav', (_ctx) => {
    let toggle = _ctx.props.toggle;
    let node = document.getElementById('help-popup');
    if (toggle) { helpers.addNodeClass(node, 'hidden'); }
    else { helpers.removeNodeClass(node, 'hidden'); }
    _ctx.props.toggle = !toggle;
  }, 'click'),
  incubateListener('previous',
    commonListeners.navHover, 'mouseover'),
  incubateListener('next',
    commonListeners.navHover, 'mouseover'),
  incubateListener('previous', (_ctx) => {
    print('previous');
  }, 'click'),
  incubateListener('next', (_ctx) => {
    print('next');
  }, 'click'),
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
