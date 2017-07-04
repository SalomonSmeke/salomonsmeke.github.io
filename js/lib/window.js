import { obtain } from './window_store';
import * as _ from './minidash';

let exposureRegistrar = obtain().exposureRegistrar;

function exposeObject(object, id) {
  if (id === undefined || object === undefined) {
    return _.err(`Incomplete exposure object: ${object}`, -1);
  }
  if (window[id]) {
    return _.err(`Cannot register object: ${id}, would overwrite previous object.`, -1);
  }
  window[id] = object;
  exposureRegistrar.push(id);
  return true;
}

function obscureObject(id) {
  const index = exposureRegistrar.indexOf(id);
  if (index !== -1) {
    delete window[id];
    exposureRegistrar = _.filter(exposureRegistrar, (v) => { (() => v === id)(id); });
    return true;
  }
  return _.err(`Cannot obscure non-existent object: ${id}.`, -1);
}

export { exposeObject, obscureObject };
