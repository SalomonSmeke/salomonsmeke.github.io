'use strict';

import * as helpers from "./helpers";

//Funky fresh listener stuff
function hatchListeners(listeners, owner) {
  let ctx = window.context;
  listeners.forEach(function (egg) {
    const id = egg.id;
    const f = egg.f;
    const type = egg.type;
    if ((id === undefined || f === undefined) || type === undefined) {
      console.error(`Incomplete listener data. Id: ${id} Owner: ${owner}.`);
      return -1;
    }
    if (ctx.listeners[id] !== undefined) {
      if (ctx.listeners[id][type] !== undefined) {
        console.warn(`Replaced outdated ${type} listener on Id: ${id} Owner:
          ${owner}. Please ensure listeners are properly unloaded.`);
      }
    } else ctx.listeners[id] = {id: id, owner: owner, props: {}};
    let node = document.getElementById(id);
    if (node === null) { //Undefined nodes are null. Not undefined.
      console.error(`Attempted listener registration on invalid node Id:
        ${id}.`);
      delete ctx.listeners[id];
      return -1;
    }
    ctx.listeners[id][type] = f;
    node.addEventListener(type, f, false);
    console.log(`Registered listener ${type} Id: ${id} Owner: ${owner}.`);
  });
}

function incubateListener(id, f, type) {
  let ctx = window.context;
  const _f = (() => {
    return () => { f(ctx.listeners[id]); };
  })(id, f, type);
  return {id: id, f: _f, type: type};
}

function removeListener(id, type) {
  let ctx = window.context;
  if (ctx.listeners[id]) {
    if (ctx.listeners[id][type]) {
      let node = document.getElementById(id);
      if (node === null) {
        console.error(`Discarding listener on dead node Id: ${id}.`);
      } else node.removeEventListener(type, ctx.listeners[id][type], false);
      delete ctx.listeners[id][type];
      return;
    }
  }
  console.error(`Attempted to discard non-existent listener Id: ${id}.`);
  return -1;
}

function removeNodeListeners(id) {
  let ctx = window.context;
  const BASEKEYS = ['id', 'owner', 'props'];
  if (ctx.listeners[id]) {
    let node = document.getElementById(id);
    if (node === null) {
      console.warn(`Discarding listener on dead node Id: ${id}.`);
    } else {
      let keys = [];
      for (const k in ctx.listeners[id]) {
        if (!helpers.contains(BASEKEYS, k)) keys.push(k);
      }
      for (let i = 0; i < keys.length; i++) {
        node.removeEventListener(keys[i], ctx.listeners[id][keys[i]], false);
      }
    }
    delete ctx.listeners[id];
    return;
  }
  console.error(`Attempted to discard non-existent listener Id: ${id}.`);
  return -1;
}

function removeOwnerListeners(owner) {
  let ctx = window.context;
  let unwrapped_listeners = [];
  for (const k in ctx.listeners) unwrapped_listeners.push(ctx.listeners[k]);
  const listeners = helpers.find(unwrapped_listeners,
    (ul) => { return (() => {return ul.owner === owner;})(owner); });
  if (listeners.length) {
    for (let i = 0; i < listeners.length; i++) {
      removeNodeListeners(listeners[i].id);
    }
    return;
  } else {
    console.error(`No listeners to remove for owner: ${owner}.`);
    return -1;
  }
}

export {
  hatchListeners,
  incubateListener,
  removeListener,
  removeNodeListeners,
  removeOwnerListeners
};
