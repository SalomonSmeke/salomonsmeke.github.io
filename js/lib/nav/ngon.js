import * as _ from '../minidash';

function getVertices(radius, pos, n) {
  const TWO_PI = Math.PI * 2;
  const PI_N = Math.PI / n;
  const angle = TWO_PI / n;
  const vertices = [];
  for (let a = 0; a < TWO_PI; a += angle) {
    const sx = pos + (Math.cos(a + PI_N) * radius);
    const sy = pos + (Math.sin(a + PI_N) * radius);
    vertices.push([sx, sy]);
  }
  return vertices;
}

function ngon_svg_type (n) {
  switch (n) {
    case 1: return 'circle';
    case 2: return 'polyline';
    default: return 'polygon';
  }
}

function vtos(vertices) {
  return vertices.join(', ');
}

function build (n, parent_id) {
  const xmlns = 'http://www.w3.org/2000/svg';
  const boxDim = 70;
  const type = ngon_svg_type(n);
  const strokeWidth = n === 1 ? 4 : 3.4;
  [
    ['top', '#ff3232', 0.88],
    ['middle', '#ff8250', 0.88],
    ['bottom', '#ffaa28', 0.9]
  ].forEach((props) => {
    const id = _.dasherize([parent_id, props[0]]);
    const color = props[1];
    const opacity = props[2];

    const svgElem = document.createElementNS(xmlns, 'svg');
    svgElem.setAttributeNS(null, 'viewBox', `0 0 ${boxDim} ${boxDim}`);
    svgElem.setAttributeNS(null, 'width', boxDim);
    svgElem.setAttributeNS(null, 'height', boxDim);

    const g = document.createElementNS(xmlns, type);
    const vertices = getVertices((boxDim / 3) - strokeWidth, boxDim / 2, n);
    if (n === 1) {
      g.setAttributeNS(null, 'cx', vertices[0][0]);
      g.setAttributeNS(null, 'cy', vertices[0][1]);
      g.setAttributeNS(null, 'r', strokeWidth / 2);
    } else g.setAttributeNS(null, 'points', vtos(vertices));

    g.setAttributeNS(null, 'stroke-width', strokeWidth);
    g.setAttributeNS(null, 'fill', 'none');
    g.setAttributeNS(null, 'stroke', color);
    svgElem.appendChild(g);

    const node = document.getElementById(id);
    const svgContainer = node.cloneNode(false);
    svgContainer.appendChild(svgElem);
    svgContainer.style.opacity = opacity;
    node.parentNode.parentNode.title = `Go-to page: ${n}`;
    node.parentNode.replaceChild(svgContainer, node);
  });
}

export { build as default };
