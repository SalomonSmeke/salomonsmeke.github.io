'use strict';

import {context as ctx} from "./globals.js";

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

export {hatchListeners, incubateListener};
