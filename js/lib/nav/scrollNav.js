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
const DATE = new Date(0);
var DIMS = {
  height: 210,
  width: 70,
};

function start() {
  var pdim = DIMS.height * 2 / 7;
  var sep = pdim / 7;
  DIMS.stroke = pdim / 5; //TODO: Replace with stroke width of nav buttons?
  DIMS.diameter = pdim - DIMS.stroke / 2;
  DIMS.x = DIMS.width / 2;
  DIMS.range = {
    min: sep + pdim / 2,
    max: DIMS.height - (sep + pdim / 2)
  };
  DIMS.motion = (DIMS.range[1] - DIMS.range[0]) / 2;
  window.requestAnimationFrame(draw);
}

function draw() {
  var canvas_ctx = document.getElementById(ELEMENT_ID).getContext(
    '2d',
    {alpha: false}
  );
  canvas_ctx.clearRect(0, 0, DIMS.width, DIMS.height); // TODO: Is this canvas clear necessary?
  canvas_ctx.globalCompositeOperation = COLOR_MODE;
  canvas_ctx.fillStyle = WHITE;
  canvas_ctx.fillRect(0, 0, DIMS.width, DIMS.height);
  const TIME = DATE.getTime();
  [
    {
      magnitude: 0.04,
      color: COLORS[0]
    },
    {
      magnitude: 0.03975,
      color: COLORS[1]
    },
    {
      magnitude: 0.0395,
      color: COLORS[2]
    }
  ].forEach((props) => {
    canvas_ctx.strokeStyle = props.color;
    var y = Math.floor(
      DIMS.motion * Math.sin(TIME * props.magnitude) + DIMS.motion
    );
  });
  /* Draw the three circles following this processing script:

    void draw()
    {
      background(255);
      blendMode(SUBTRACT);
      noFill();
      strokeWeight(str);
      stroke(cs[0]);
      ellipse(x, motion * sin(frameCount*.04) + motion, dim, dim);
      stroke(cs[1]);
      ellipse(x, motion * sin(frameCount*.0397) + (range[0]+range[1])/2, dim, dim);
      stroke(cs[2]);
      ellipse(x, motion * sin(frameCount*.0395) + (range[0]+range[1])/2, dim, dim);
    }
  */
}

export {start};
