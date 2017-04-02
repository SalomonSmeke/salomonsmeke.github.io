'use strict';

let context = {
  listeners: {},
  bar_vals: {
    x: null,
    p: 0,
    s: 0,
    c: 0
  }
};

/*
 * Options for the initial bars displayed on the home page.
 * Hand-picked.
 * Structure:
 * {
 * x: (str) -> The hexadecimal color base.
 * p: (int) -> The integer pivot indicating red, green or blue. [0|1|2]
 * s: (float) -> The floating point 'strength' with which to generate colors.
 */
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
  }
];

export{ context, INIT_BAR_VALS_OPTIONS };
