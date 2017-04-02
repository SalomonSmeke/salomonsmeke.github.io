'use strict';

import * as helpers from "./helpers.js";

function navHover(_ctx) {
  if (_ctx.props.hovered) return;
  _ctx.props.hovered = true;
  const keys = ['middle', 'bottom'];
  const id = _ctx.id;
  let speed = 12*2; // 12 is the base speed.
  keys.forEach((v) => {
    document.getElementById(helpers.dasherize(['rotation-hack', id, v]))
    .style.animation = speed + 's rotateLeft linear';
    speed*=2;
  });
  setTimeout(() => {
    keys.forEach((v) => {
      let node = document.getElementById(helpers.dasherize(['rotation-hack', id, v]));
      node.style = '';
      void node.offsetWidth;
    });
    _ctx.props.hovered = false;
  }, 48 * 1000); // Coalescence: ∆t = 12 * elems
}

export {navHover};
