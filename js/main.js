"use strict";
var loader = document.getElementById("loader-wrapper");
loader.parentNode.removeChild(loader);

let ctx = {
  listeners: {}
};

function registerListeners(listeners, owner) {
  listeners.forEach(function (l) {
    let id = l.id;
    let f = l.f;
    if (id == null || f == null) {
      console.error('Incomplete listener data. Id: %s Owner: %s', id, owner);
      return;
    }
    if (ctx.listeners[id] != null) {
      console.warn(`Replaced outdated listener on Id: %s Owner: %s.
        Please ensure listeners are properly unloaded.`, id, owner);
    }
    let node = document.getElementById(id);
    if (node == null) {
      console.error(`Attempted listener registration on invalid node
        Id: %s`, id);
      return;
    }
    node.onclick = f;
    ctx.listeners[id] = {id: id, owner: owner, function: f, props: {}};
    console.log('Registered listener Id: %s Owner: %s', id, owner);
  });
};

function buildListener(id, f) {
  var _f = (function (id, f) {
    return function() { f(ctx.listeners[id]); };
  })(id, f);
  return {id: id, f: _f};
};

function removeNodeClass(node, c) {
  node.className = node.className.replace(c, '');
};

function addNodeClass(node, c) {
  removeNodeClass(node, c);
  node.className += c;
};

registerListeners([
  buildListener('help-nav', function(_ctx) {
    let toggle = _ctx.props.toggle;
    let node = document.getElementById('help-popup');
    if (toggle) { addNodeClass(node, 'hidden'); }
    else { removeNodeClass(node, 'hidden'); }
    _ctx.props.toggle = !toggle; //State :O wao.
  })
], 'root');

//unregister listeners
//unregister owner

//Load bars
//Load svg's
