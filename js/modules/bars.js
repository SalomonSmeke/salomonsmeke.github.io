/*jshint loopfunc: true */
'use strict';

import {base_module as base_module} from "./_module.js";
import {context as globalctx} from "../lib/globals.js";
import * as _ from "../lib/minidash.js";

/*
 * bars.js
 * Controls the main color display on the base site, and provides an interface
 * to interact with them.
 *
 * ctx contains the base values:
 * x: (str) -> The hexadecimal color base.
 * p: (int) -> The integer pivot indicating red, green or blue. [0|1|2]
 * s: (float) -> The floating point 'strength' with which to generate colors.
 * c: (0 < int < 10) -> The integer indicating how many bars to display.
 *
 * bars object exposes the following:
 * set(str, val) -> sets base, pivot, strength or count. Reloads bars.
 * get(str) -> Displays all inner vars, or just the specified one.
 * reload() -> Reloads bars.
 * pprint() -> Pretty prints bars.
 * help() -> Displays help.
 */

const MAX_C = 255;
const INIT_BAR_VALS_OPTIONS = [
  {
    x: 'fe4365',
    p: 0,
    s: 0.9
  },
  {
    x: '30fd9f',
    p: 1,
    s: 1
  },
  {
    x: 'ff5555',
    p: 0,
    s: 0.85
  },
  {
    x: 'ff8519',
    p: 1,
    s: 0.7
  },
  {
    x: 'ffff88',
    p: 1,
    s: 0.4
  }
];

let ctx = {
  bar_vals: {
    x: null,
    p: 0,
    s: 0,
    c: 0
  },
  colors: []
};

function makeColors() {
  // Named these just to make the code less obscure.
  // Its pretty obscure.
  // Oh well.
  const hex = ctx.bar_vals.x;
  const strength = ctx.bar_vals.s;
  const pivot = ctx.bar_vals.p;
  const count = ctx.bar_vals.c;
  const base = hex.match(/.{2}/g);
  const pivot_int = parseInt(base[pivot], 16);
  const delta = Math.floor(strength * pivot_int / (count - 1));
  var colors = [];
  colors.push(hex);
  for (var i = 1; i < count; i++) colors.push(
    base.map(
      (v, p) => {
        if (p === pivot) {
          var str = Number(pivot_int - delta * i).toString(16);
          return str.length === 1 ? "0" + str : str;
        } else return v;
      }
  ).join(''));
  ctx.colors = colors;
}
function draw() {
  var node = document.getElementById('bar-container');
  var swap = node.cloneNode(false);
  var bar_template = document.createElement('div');
  bar_template.setAttribute('class', 'bar');
  ctx.colors.forEach((c) => {
    var clone = bar_template.cloneNode(false);
    clone.style.backgroundColor = `#${c}`;
    swap.append(clone);
  });
  node.parentNode.replaceChild(swap, node);
  window.ctx=ctx;
}
function reload() {
  makeColors();
  draw();
}
function set(type, val) {

}
function get(type) {

}
function pprint() {

}
function rngesus() {

}
function time() {

}
function init() {
  const vals = INIT_BAR_VALS_OPTIONS[
    _.intInRange(0, INIT_BAR_VALS_OPTIONS.length-1)
  ];
  Object.keys(vals).forEach((v) => {ctx.bar_vals[v] = vals[v];});
  ctx.bar_vals.c = _.intInRange(2, 7);
  reload();
}

const HELP_OPTIONS = {
    help: {
      'Command': 'help()',
      'Description': 'Displays this message.',
      'Args': 'None.'
    },
    set: {
      'Command': 'set(type, val)',
      'Description': 'Set a parameter for the algorithm.',
      'Args': 'type (base|pivot|strength|intervals), val(str|int|float|int).'
    },
    get: {
      'Command': 'get(type)',
      'Description': 'Get a value from the algorithm.',
      'Args': 'type (base|pivot|strength|intervals|generated).'
    },
    reload: {
      'Command': 'reload()',
      'Description': 'Reload the bars. Normally unnecessary.',
      'Args': 'None.'
    },
    pprint: {
      'Command': 'pprint()',
      'Description': 'Pretty print var values.',
      'Args': 'None.'
    },
    rngesus: {
      'Command': 'rngesus()',
      'Description': 'Jesus take the wheel!',
      'Args': 'None.'
    },
    time: {
      'Command': 'time()',
      'Description': 'Find out!',
      'Args': 'None.'
    }
};

function help() {
  console.table(HELP_OPTIONS);
  return HELP_OPTIONS;
}

let module_def = base_module();
module_def.LOAD = [
  init
];
module_def.WINDOW_EXPOSE = {
  help: help,
  set: set,
  get: get,
  reload: reload,
  pprint: pprint
};
module_def.id = 'bars';

export { module_def };
