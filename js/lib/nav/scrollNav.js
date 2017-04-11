"use strict";

import * as _ from "../minidash.js";

//TODO: This. Simply stubbing out stuff.

const WHITE = '#fff';
const COLORS = [
  '#f00',
  '#0f0',
  '#00f'
];
const COLOR_MODE = 'difference';
const ELEMENT_ID = 'scroll-nav';
var DIMS = {
  height: 420,
  width: 140,
};
var raf;

function start() {
  var pdim = DIMS.height / 5;
  var sep = pdim / 8;
  DIMS.stroke = pdim / 5;
  DIMS.radius = (pdim - DIMS.stroke) / 2;
  DIMS.x = DIMS.width / 2;
  DIMS.y_offset = DIMS.height / 2;
  DIMS.range = {
    min: sep + pdim,
    max: DIMS.height - (sep + pdim / 2)
  };
  DIMS.motion = (DIMS.range.max - DIMS.range.min) / 2;
  raf = window.requestAnimationFrame(draw);
}

function draw(ts) {
  //TODO: Smooth by scaling this up
  ts /= 10;
  var canvas_ctx = document.getElementById(ELEMENT_ID).getContext(
    '2d',
    {alpha: false}
  );
  canvas_ctx.lineWidth = DIMS.stroke;
  canvas_ctx.clearRect(0, 0, DIMS.width, DIMS.height);
  canvas_ctx.globalCompositeOperation = COLOR_MODE;
  canvas_ctx.fillStyle = WHITE;
  canvas_ctx.fillRect(0, 0, DIMS.width, DIMS.height);
  [
    {
      magnitude: 0.019,
      color: COLORS[0]
    },
    {
      magnitude: 0.0189,
      color: COLORS[1]
    },
    {
      magnitude: 0.0188,
      color: COLORS[2]
    }
  ].forEach((props) => {
    canvas_ctx.strokeStyle = props.color;
    canvas_ctx.beginPath();
    canvas_ctx.arc(
      DIMS.x,
      (DIMS.motion * Math.cos(ts * props.magnitude) + DIMS.y_offset),
      DIMS.radius,
      0,
      Math.PI * 2);
    canvas_ctx.stroke();
  });
  raf = window.requestAnimationFrame(draw);
}

export {start};
