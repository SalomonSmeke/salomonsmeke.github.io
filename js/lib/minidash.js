/*
 * Prefer .forEach over anything else. Prefer of over in. Prefer Object.keys over in.
 */

function err(message, ret) {
  console.error(message);
  return Boolean(ret);
}

function dasherize (elements) {
  return elements.join('-');
}

function removeNodeClass(node, c) {
  node.className = node.className.replace(c, '');
}

function addNodeClass(node, c) {
  removeNodeClass(node, c);
  node.className += c;
}

function intInRange(min, max) {
  return Math.floor(Math.random() * ((max - min) + 1)) + min;
}

export {
  err,
  dasherize,
  removeNodeClass,
  addNodeClass,
  intInRange
};
