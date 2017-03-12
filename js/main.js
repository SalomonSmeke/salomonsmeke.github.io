"use strict";

import * as helpers from "./lib/helpers.js";
import {build as buildngon} from "./lib/ngon.js";

//Global context
let ctx = {
  listeners: {}
};

//Funky fresh listener stuff
function hatchListeners(listeners, owner) {
  listeners.forEach(function (egg) {
    const id = egg.id;
    const f = egg.f;
    const type = egg.type;
    if ((id === undefined || f === undefined) || type === undefined) {
      console.error('Incomplete listener data. Id: ' + id + ' Owner: ' + owner);
      return;
    }
    if (ctx.listeners[id] !== undefined) {
      if (ctx.listeners[id][type] !== undefined) {
        console.warn('Replaced outdated ' + type + ' listener on Id: ' + id +
         ' Owner: ' + owner +
         '. Please ensure listeners are properly unloaded.');
      }
    } else ctx.listeners[id] = {};
    let node = document.getElementById(id);
    if (node === null) { //Undefined nodes are null. Not undefined.
      console.error('Attempted listener registration on invalid node Id: ' +
        id);
      delete ctx.listeners[id];
      return;
    }
    node[type] = f;
    ctx.listeners[id] = {id: id, owner: owner, props: {}};
    ctx.listeners[id][type] = true;
    console.log('Registered listener ' + type + ' Id: ' + id + ' Owner: ' +
     owner);
  });
}

function incubateListener(id, f, type) {
  const _f = ((id, f, type) => {
    return (() => { f(ctx.listeners[id]); });
  })(id, f, type);
  return {id: id, f: _f, type: type};
}

//Listener functions
function navHover(_ctx) {
  if (_ctx.props.hovered) return;
  _ctx.props.hovered = true;
  const id = _ctx.id;
  let speed = 12*6;
  ['bottom', 'middle'].forEach((v) => {
    document.getElementById(helpers.dasherize(['rotation-hack', id, v]))
    .style.animation = speed + 's rotateLeft linear';
    speed*=2;
  });
}

//Execution. Nothing here is final.
hatchListeners([
  incubateListener('help-nav', (_ctx) => {
    let toggle = _ctx.props.toggle;
    let node = document.getElementById('help-popup');
    if (toggle) { helpers.addNodeClass(node, 'hidden'); }
    else { helpers.removeNodeClass(node, 'hidden'); }
    _ctx.props.toggle = !toggle;
  }, 'onclick'),
  incubateListener('previous', navHover, 'onmouseover'),
  incubateListener('next', navHover, 'onmouseover'),
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
