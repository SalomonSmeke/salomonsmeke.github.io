"use strict";

import * as _ from "../minidash.js";

//TODO: This. Simply stubbing out stuff.

function draw() {
  var canvas_ctx = document.getElementById('scroll-nav').getContext(
    '2d',
    {alpha: false}
  );
  canvas_ctx.clearRect(0, 0, 70, 210); // TODO: Is this canvas clear necessary?
  canvas_ctx.globalCompositeOperation = 'difference';

  /* Draw the three circles following this processing script:
    color[] cs = {
      color(255, 0, 0),
      color(0, 255, 0),
      color(0, 0, 255)};
    float pdim;
    float dim;
    float sep;
    float str;
    float x;
    float[]range = {0, 0};
    float motion;
    float height_pdim = 2f/7;
    float pdim_sep = 1f/7;
    float str_pdim = 1f/5;
    float width_x = 1f/2;

    void setup()
    {
      size(200, 600);
      background(255);

      pdim = height * height_pdim;
      sep = pdim * pdim_sep;
      str = pdim * str_pdim;
      dim = pdim - pdim * str_pdim;
      x = width * width_x;
      range[0] = (sep + pdim/2);
      range[1] = height-(sep + pdim/2);
      motion = (range[1] - range[0]) / 2;
    }

    void draw()
    {
      background(255);
      blendMode(SUBTRACT);
      noFill();
      strokeWeight(str);
      stroke(cs[0]);
      ellipse(x, motion * sin(frameCount*.04) + (range[0]+range[1])/2, dim, dim);
      stroke(cs[1]);
      ellipse(x, motion * sin(frameCount*.0397) + (range[0]+range[1])/2, dim, dim);
      stroke(cs[2]);
      ellipse(x, motion * sin(frameCount*.0395) + (range[0]+range[1])/2, dim, dim);
    }
  */
}

export {draw};
