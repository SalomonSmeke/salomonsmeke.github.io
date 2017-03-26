"use strict";

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
  for (let i = 0; i < arr.length; i++) if (arr[i] === tv) return true;
  return false;
}

function findOne(arr, f) {
  for (let i = 0; i < arr.length; i++) if (f(arr[i])) return arr[i];
}

function find(arr, f) {
  let acc = [];
  for (let i = 0; i < arr.length; i++) if (f(arr[i])) acc.push(arr[i]);
  return acc;
}

export {dasherize, removeNodeClass, addNodeClass, contains, findOne, find};
