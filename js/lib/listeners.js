'use strict';

import * as helpers from "./helpers.js";

function navHover(_ctx) {
  if (_ctx.props.hovered) return;
  _ctx.props.hovered = true;
  const keys = ['middle', 'bottom'];
  const id = _ctx.id;
  let speed = 12*2; // 12 is the base speed.
  let nodes = keys.map((v) => {
    let node = document.getElementById(helpers.dasherize(['rotation-hack', id, v]));
    node.style.animation = speed + 's rotateLeft linear';
    speed*=2;
    return node;
  });
  setTimeout(() => {
    nodes.forEach((n) => {
      n.style = '';
      void n.offsetWidth;
    });
    _ctx.props.hovered = false;
  }, 48 * 1000); // Coalescence: ∆t = 12 * elems
}

export {navHover};
