"use strict";

/*
 * Prefer .forEach over anything else. Prefer of over in. Prefer Object.keys over in.
 */

function dasherize (elements) {
  let out = "";
  elements.forEach((el) => { out += el + '-'; });
  return out.slice(0, -1);
}

function removeNodeClass(node, c) {
  node.className = node.className.replace(c, '');
}

function addNodeClass(node, c) {
  removeNodeClass(node, c);
  node.className += c;
}

function contains(arr, tv) {
  for (const v of arr) if (v === tv) return true;
  return false;
}

function findOne(arr, f) {
  for (const v of arr) if (f(v)) return v;
}

function find(arr, f) {
  let acc = [];
  arr.forEach((v) => {if (f(v)) acc.push(v);});
  return acc;
}

function filter(arr, f) {
  let acc = [];
  arr.forEach((v) => {if (!f(v)) acc.push(v);});
  return acc;
}

export {dasherize, removeNodeClass, addNodeClass, contains, findOne, find, filter};
