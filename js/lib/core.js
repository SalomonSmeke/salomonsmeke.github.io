'use strict';

import {context as ctx} from "./globals.js";
import * as helpers from "./helpers";

//TODO: Either abstract this and get rid of core, or put these in subobjects.

//******* LISTENERS *******

/*
 * hatchListeners(listener, str)
 * Applying a listener to a node.
 */
function hatchListeners(listeners, owner) {
  listeners.forEach((egg) => {
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

/*
 * incubateListener(str, f, str)
 * Helper for formatting a function into a clojure that our listener structure
 * accepts.
 */
function incubateListener(id, f, type) {
  const _f = (() => {
    return () => { f(ctx.listeners[id], ctx); };
  })(id, f, type);
  return {id: id, f: _f, type: type};
}

/*
 * removeListener(str, str)
 * Removes one listener from one node, by type.
 */
function removeListener(id, type) {
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

/*
 * removeNodeListeners(str)
 * Removes all listeners from one node.
 */
function removeNodeListeners(id) {
  const BASEKEYS = ['id', 'owner', 'props'];
  if (ctx.listeners[id]) {
    let node = document.getElementById(id);
    if (node === null) {
      console.warn(`Discarding listener on dead node Id: ${id}.`);
    } else {
      let keys = [];
      Object.keys(ctx.listeners[id]).forEach((k) => {
        if (!helpers.contains(BASEKEYS, k)) keys.push(k);
      });
      keys.forEach((k) => {
        node.removeEventListener(k, ctx.listeners[id][k], false);
      });
    }
    delete ctx.listeners[id];
    return;
  }
  console.error(`Attempted to discard non-existent listener Id: ${id}.`);
  return -1;
}

/*
 * removeOwnerListeners(str)
 * Removes all listeners attributed to an owner.
 */
function removeOwnerListeners(owner) {
  let unwrapped_listeners = [];
  Object.keys(ctx.listeners).forEach((k) => {
    unwrapped_listeners.push(ctx.listeners[k]);
  });
  const listeners = helpers.find(unwrapped_listeners,
    (ul) => { return (() => {return ul.owner === owner;})(owner); });
  if (listeners.length) {
    listeners.forEach((l) => {removeNodeListeners(l.id);});
    return;
  } else {
    console.error(`No listeners to remove for owner: ${owner}.`);
    return -1;
  }
}

//******* CONSOLE *******

let exposureRegistrar = [];

function exposeObject(object) {
  const id = object.id;
  const vals = object.vals;
  if (id === undefined || vals === undefined) {
    console.error(`Incomplete exposure object: ${object}`);
    return -1;
  }
  if (window[id]) {
    console.error(`Cannot register object: ${key}
      , would overwrite previous object.`);
    return -1;
  }
  window[id] = vals;
  exposureRegistrar.push(id);
}

function revokeObject(id){
  const index = exposureRegistrar.indexOf(id);
  if (index !== -1) {
    delete window[id];
    exposureRegistrar = helpers.filter(exposureRegistrar, ((v) => {
      v === id;
    })(id));
  }
  console.error(`Cannot revoke non-existent object: ${id}.`);
  return -1
}

export {
  hatchListeners,
  incubateListener,
  removeListener,
  removeNodeListeners,
  removeOwnerListeners,
  exposeObject
};
