import ctx from './globals';
import * as _ from './minidash';

/*
 * hatchListeners(listener, str)
 * Applying a listener to a node.
 */
function hatchListeners(listeners, owner) {
  listeners.forEach(({ id, f, type, props }) => {
    if ((id === undefined || f === undefined) || type === undefined) {
      return _.err(`Incomplete listener data. Id: ${id} Owner: ${owner}.`, -1);
    }
    if (ctx.listeners[id] !== undefined) {
      if (ctx.listeners[id][type] !== undefined) {
        console.warn(`Replaced outdated ${type} listener on Id: ${id} Owner:
          ${owner}. Please ensure listeners are properly unloaded.`);
      }
    } else ctx.listeners[id] = { id, owner, props };
    const node = document.getElementById(id);
    if (node === null) { // Undefined nodes are null. Not undefined.
      delete ctx.listeners[id];
      return _.err(`Attempted listener registration on invalid node Id:${id}.`, -1);
    }
    ctx.listeners[id][type] = f;
    node.addEventListener(type, f, false);
    console.log(`Registered listener ${type} Id: ${id} Owner: ${owner}.`);
    return true;
  });
}

/*
 * incubateListener(str, f, str)
 * Helper for formatting a function into a clojure that our listener structure
 * accepts.
 */
function incubateListener(id, f, type, props) {
  const _f = (() => () => f(ctx.listeners[id], ctx))(id, f, type);
  return { id, f: _f, type, props };
}

/*
 * removeListener(str, str)
 * Removes one listener from one node, by type.
 */
function removeListener(id, type) {
  if (ctx.listeners[id]) {
    if (ctx.listeners[id][type]) {
      const node = document.getElementById(id);
      if (node === null) console.warn(`Discarding listener on dead node Id: ${id}.`);
      else node.removeEventListener(type, ctx.listeners[id][type], false);
      delete ctx.listeners[id][type];
      return true;
    }
  }
  return _.err(`Attempted to discard non-existent listener Id: ${id}.`, -1);
}

/*
 * removeNodeListeners(str)
 * Removes all listeners from one node.
 */
function removeNodeListeners(id) {
  const BASEKEYS = ['id', 'owner', 'props'];
  if (ctx.listeners[id]) {
    const node = document.getElementById(id);
    if (node === null) console.warn(`Discarding listeners on dead node Id: ${id}.`);
    else {
      const keys = [];
      Object.keys(ctx.listeners[id]).forEach((k) => {
        if (!BASEKEYS.includes(k)) keys.push(k);
      });
      keys.forEach((k) => { node.removeEventListener(k, ctx.listeners[id][k], false); });
    }
    delete ctx.listeners[id];
    return true;
  }
  return _.err(`Attempted to discard non-existent listener Id: ${id}.`, -1);
}

/*
 * removeOwnerListeners(str)
 * Removes all listeners attributed to an owner.
 */
function removeOwnerListeners(owner) {
  const listeners = Object.keys(ctx.listeners).reduce(
    (acc, k) => {
      const l = ctx.listeners[k];
      if (l.owner === owner) acc.push(l);
      return acc;
    },
    []
  );
  if (listeners.length) {
    listeners.forEach(l => removeNodeListeners(l.id));
    return true;
  }
  return _.err(`No listeners to remove for owner: ${owner}.`, -1);
}

export {
  hatchListeners,
  incubateListener,
  removeListener,
  removeNodeListeners,
  removeOwnerListeners
};
