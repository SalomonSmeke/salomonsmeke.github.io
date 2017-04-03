'use strict';

import {context as ctx} from "./globals.js";
import * as _ from "./minidash";

let exposureRegistrar = ctx.exposureRegistrar;

function exposeObject(object, id) {
  if (id === undefined || object === undefined) {
    console.error(`Incomplete exposure object: ${object}`);
    return -1;
  }
  if (window[id]) {
    console.error(`Cannot register object: ${id}
      , would overwrite previous object.`);
    return -1;
  }
  window[id] = object;
  exposureRegistrar.push(id);
}

function obscureObject(id){
  const index = exposureRegistrar.indexOf(id);
  if (index !== -1) {
    delete window[id];
    exposureRegistrar = _.filter(exposureRegistrar,
      (v) => { (() => { return v === id; })(id); } //TODO: Clojure builder. this is gross.
    );
    return;
  }
  console.error(`Cannot obscure non-existent object: ${id}.`);
  return -1;
}

export {
  exposeObject,
  obscureObject
};
