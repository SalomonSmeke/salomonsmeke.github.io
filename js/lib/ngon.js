"use strict";

import * as helpers from "./helpers.js";

function getVertices(radius, pos, n) {
  const angle = Math.PI * 2 / n;
  let vertices = [];
  for (let a = 0; a < Math.PI*2; a += angle) {
    let sx = pos + Math.cos(a + Math.PI/n)*radius;
    let sy = pos + Math.sin(a + Math.PI/n)*radius;
    vertices.push([sx, sy]);
  }
  return vertices;
}

function vtos(vertices) {
  let out = "";
  vertices.forEach((v) => { out += v[0] + ", " + v[1] + " "; });
  return out.trim();
}

function build (n, parent_id) {
  const xmlns = "http://www.w3.org/2000/svg";
  const boxDim = 70;
  const type = n === 1 ? "circle" : n === 2 ? "polyline" : "polygon";
  const strokeWidth = n === 1 ? 4 : 3.4;
  [
    ['top', '#ff3232', 0.88],
    ['middle', '#ff8250', 0.88],
    ['bottom', '#ffaa28', 0.9]
  ].forEach((props) => {
    const id = helpers.dasherize([parent_id, props[0]]);
    const color = props[1];
    const opacity = props[2];

    let svgElem = document.createElementNS(xmlns, "svg");
    svgElem.setAttributeNS(null, "viewBox", "0 0 " + boxDim + " " + boxDim);
    svgElem.setAttributeNS(null, "width", boxDim);
    svgElem.setAttributeNS(null, "height", boxDim);

    let g = document.createElementNS(xmlns, type);
    const vertices = getVertices(boxDim / 3 - strokeWidth, boxDim / 2, n);
    if (n === 1) {
      g.setAttributeNS(null, 'cx', vertices[0][0]);
      g.setAttributeNS(null, 'cy', vertices[0][1]);
      g.setAttributeNS(null, 'r', strokeWidth/2);
    } else g.setAttributeNS(null, 'points', vtos(vertices));

    g.setAttributeNS(null, 'stroke-width', strokeWidth);
    g.setAttributeNS(null, 'fill', 'none');
    g.setAttributeNS(null, 'stroke', color);
    svgElem.appendChild(g);

    let node = document.getElementById(id);
    let svgContainer = node.cloneNode(false);
    svgContainer.appendChild(svgElem);
    svgContainer.style.opacity = opacity;
    node.parentNode.replaceChild(svgContainer, node);
  });
}

export {getVertices, vtos, build};
