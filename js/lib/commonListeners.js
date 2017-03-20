'use strict';

import * as helpers from "./helpers.js";

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

export {navHover};
