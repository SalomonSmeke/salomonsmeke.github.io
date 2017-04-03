'use strict';

import {context as ctx} from "./globals.js";
import * as helpers from "./helpers";

let exposureRegistrar = ctx.exposureRegistrar;

function exposeObject(object) {
  debugger
  const id = object.id;
  const vals = object.vals;
  if (id === undefined || vals === undefined) {
    console.error(`Incomplete exposure object: ${object}`);
    return -1;
  }
  if (window[id]) {
    console.error(`Cannot register object: ${id}
      , would overwrite previous object.`);
    return -1;
  }
  window[id] = vals;
  exposureRegistrar.push(id);
}

function obscureObject(id){
  const index = exposureRegistrar.indexOf(id);
  if (index !== -1) {
    delete window[id];
    exposureRegistrar = helpers.filter(exposureRegistrar, ((v) => {
      return v === id;
    })(id));
  }
  console.error(`Cannot obscure non-existent object: ${id}.`);
  return -1;
}

export {
  exposeObject,
  obscureObject
};
