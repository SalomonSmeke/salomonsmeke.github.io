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

export { dasherize, removeNodeClass, addNodeClass };
