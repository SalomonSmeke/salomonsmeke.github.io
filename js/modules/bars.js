/*jshint loopfunc: true */
'use strict';

import {spawn_module as spawn_module} from "./_module.js";
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

let ctx = {
  bar_vals: {
    x: null,
    p: 0,
    s: 0,
    c: 0
  },
  colors: [],
  time_interval: false
};

function clear_time_interval() {
  ctx.date = null;
  if (ctx.time_interval) clearInterval(ctx.time_interval);
  ctx.time_interval = false;
}
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
}
function reload() {
  makeColors();
  draw();
}
function set(type, val) {
  switch (type) {
    case 'base':
      if (typeof val !== "string") {
        return _.err(`Invalid value: ${val} for type: not a string`);
      }
      val.replace('#', '');
      if (val.length !== 6) {
        return _.err(`Invalid value: ${val} for type: not 6 long`);
      }
      if (!/^[0-9A-Fa-f]{6}$/i.test(val)) {
        return _.err(`Invalid value: ${val} for type: not hexadecimal`);
      }
      ctx.bar_vals.x = val;
      break;
    case 'pivot':
      if (!_.contains([0,1,2], parseInt(val))) {
        return _.err(`Invalid value: ${val} for type: not in range [0|1|2]`);
      }
      ctx.bar_vals.p = val;
      break;
    case 'strength':
      if (val < 0 || val > 1) {
        return _.err(`Invalid value: ${val} for type: not 0 <= val <= 1`);
      }
      ctx.bar_vals.s = val;
      break;
    case 'intervals':
      if (!parseInt(val)) return _.err(`Invalid value: ${val} for type.`);
      ctx.bar_vals.c = val;
      break;
    default: return _.err(`Invalid type: ${type}.`);
  }
  clear_time_interval();
  reload();
}
function get(type) {
  if (type === 'generated') return ctx.generated;
  if (ctx.bar_vals.hasOwnProperty(type)) return ctx.bar_vals[type];
  console.error(`Invalid type: ${type}.`);
  return false;
}
function pprint() {
  //TODO: this. So close to being done with das bars.
}
function rngesus() {
  let largest = 0;
  const x_max = _.intInRange(0, MAX_C * 3);
  let x_ratios = [];
  let x_total = 0;
  for (let i = 0; i < 3; i++) {
    const s = Math.random();
    x_total += s;
    x_ratios.push(s);
  }
  let x_values = x_ratios.map((r, i) => {
    const v = Math.floor(
      Math.min(r / x_total * x_max, MAX_C)
    );
    if (v > largest) { ctx.bar_vals.p = i; largest = v; }
    const str = v.toString(16);
    return str.length === 1 ? "0" + str : str;
  });
  ctx.bar_vals.x = x_values.join('');
  ctx.bar_vals.s = _.intInRange(30,100) / 100.0;
  ctx.bar_vals.c = _.intInRange(1, 10);
  clear_time_interval();
  reload();
}
function update_time(should_pivot) {
  let date = new Date();
  var largest = 0;
  ctx.bar_vals.x = [
    date.getHours()*10.625,
    date.getMinutes()*4.25,
    date.getSeconds()*4.25
  ].map((v, i) => {
    //TODO: something is wrong in the pivoting.
    if (should_pivot && v >= largest) { ctx.bar_vals.p = i; largest = v; }
    v = Math.round(v).toString(16);
    return v.length === 1 ? "0" + v : v;
  }).join('');
  reload();
}
function time() {
  if (ctx.time_interval) return _.err('Time already active.');
  update_time(true);
  ctx.time_interval = setInterval(() => {update_time();}, 1000);
}
function init() {
  ctx.bar_vals.s = _.intInRange(30,100) / 100.0;
  ctx.bar_vals.c = _.intInRange(1, 10);
  time();
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

function help() { console.table(HELP_OPTIONS); }

let module_def = spawn_module({
  id: 'bars',
  LOAD: [init],
  WINDOW_EXPOSE: {
    help: help,
    set: set,
    get: get,
    reload: reload,
    pprint: pprint,
    rngesus: rngesus,
    time: time
  }
});

export { module_def };
