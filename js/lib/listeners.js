import ctx from './globals';
import * as _ from './minidash';

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
      return _.err(`Incomplete listener data. Id: ${id} Owner: ${owner}.`, -1);
    }
    if (ctx.listeners[id] !== undefined) {
      if (ctx.listeners[id][type] !== undefined) {
        console.warn(`Replaced outdated ${type} listener on Id: ${id} Owner:
          ${owner}. Please ensure listeners are properly unloaded.`);
      }
    } else ctx.listeners[id] = { id, owner, props: {} };
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
function incubateListener(id, f, type) {
  const _f = (() => () => f(ctx.listeners[id], ctx))(id, f, type);
  return { id, f: _f, type };
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
    if (node === null) console.warn(`Discarding listener on dead node Id: ${id}.`);
    else {
      const keys = [];
      Object.keys(ctx.listeners[id]).forEach((k) => {
        if (!_.contains(BASEKEYS, k)) keys.push(k);
      });
      keys.forEach((k) => { node.removeEventListener(k, ctx.listeners[id][k], false); });
    }
    delete ctx.listeners[id];
    return;
  }
  _.err(`Attempted to discard non-existent listener Id: ${id}.`, -1);
}

/*
 * removeOwnerListeners(str)
 * Removes all listeners attributed to an owner.
 */
function removeOwnerListeners(owner) {
  const unwrapped_listeners = [];
  Object.keys(ctx.listeners).forEach((k) => { unwrapped_listeners.push(ctx.listeners[k]); });
  const listeners = _.find(unwrapped_listeners, ul => (() => ul.owner === owner)(owner));
  if (listeners.length) {
    listeners.forEach(l => removeNodeListeners(l.id));
    return true;
  }
  return _.err(`No listeners to remove for owner: ${owner}.`, -1);
}

const common = {
  // TODO: this has no business here, put them in the fucking module.
  /*
   * Listener for the navigational elements for pagination.
   * Intended as an 'onHover'.
   * Animates the ngons.
   */
  navHover: function navHover(_ctx) {
    if (_ctx.props.hovered) return;
    _ctx.props.hovered = true;
    const keys = ['middle', 'bottom'];
    const id = _ctx.id;
    let speed = 12 * 2; // 12 is the base speed.
    const nodes = keys.map((v) => {
      const node = document.getElementById(_.dasherize(['rotation-hack', id, v]));
      node.style.animation = `${speed}s rotateLeft linear`;
      speed *= 2;
      return node;
    });
    setTimeout(() => {
      nodes.forEach((n) => {
        n.style.animation = '';
        // This is a hack. But we need it to reset the animation.
        /* eslint-disable */
        void n.offsetWidth;
        /* eslint-enable */
      });
      _ctx.props.hovered = false;
    }, 48 * 1000); // Coalescence: ∆t = 12 * elems
  }
};

export {
  common,
  hatchListeners,
  incubateListener,
  removeListener,
  removeNodeListeners,
  removeOwnerListeners
};
