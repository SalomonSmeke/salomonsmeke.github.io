"use strict";

//Global context
var ctx = {
  listeners: {}
};

function dasherize(elements) {
  var out = "";
  elements.forEach(function (e) { out += e + '-'; });
  return out.slice(0, -1);
}

//Funky fresh listener stuff
function registerListeners(listeners, owner) {
  listeners.forEach(function (l) {
    var id = l.id;
    var f = l.f;
    var type = l.type;
    if ((id === undefined || f === undefined) || type === undefined) {
      console.error('Incomplete listener data. Id: ' + id + ' Owner: ' + owner);
      return;
    }
    if (ctx.listeners[id] !== undefined) {
      if (ctx.listeners[id][type] !== undefined) {
        console.warn('Replaced outdated ' + type + ' listener on Id: ' + id +
         ' Owner: ' + owner +
         '. Please ensure listeners are properly unloaded.');
      }
    } else ctx.listeners[id] = {};
    var node = document.getElementById(id);
    if (node === null) { //Undefined nodes are null. Not undefined.
      console.error('Attempted listener registration on invalid node Id: ' +
        id);
      delete ctx.listeners[id];
      return;
    }
    node[type] = f;
    ctx.listeners[id] = {id: id, owner: owner, props: {}};
    ctx.listeners[id][type] = true;
    console.log('Registered listener ' + type + ' Id: ' + id + ' Owner: ' +
     owner);
  });
}

function buildListener(id, f, type) {
  var _f = (function (id, f, type) {
    return function() { f(ctx.listeners[id]); };
  })(id, f, type);
  return {id: id, f: _f, type: type};
}

//Dom helpers
function removeNodeClass(node, c) {
  node.className = node.className.replace(c, '');
}

function addNodeClass(node, c) {
  removeNodeClass(node, c);
  node.className += c;
}

//SVG building
function buildngon(n, parent_id) {
  var xmlns = "http://www.w3.org/2000/svg";
  var boxWidth = 70;
  var boxHeight = boxWidth;

  function points(radius, pos) {
    var angle = Math.PI * 2 / n;
    var vertices = [];
    for (var a = 0; a < Math.PI*2; a += angle) {
      var sx = pos + Math.cos(a + Math.PI/n)*radius;
      var sy = pos + Math.sin(a + Math.PI/n)*radius;
      vertices.push([sx, sy]);
    }
    return vertices;
  }
  function patos(pa) {
    var s = "";
    pa.forEach(function(pvs){ s += pvs[0] + ", " + pvs[1] + " "; });
    return s.trim();
  }
  var type = n === 1 ? "circle" : n === 2 ? "polyline" : "polygon";
  [
    ['top', '#ff3232', 0.88],
    ['middle', '#ff8250', 0.88],
    ['bottom', '#ffaa28', 0.9]
  ].forEach(function(props) {
    var id = dasherize([parent_id, props[0]]);
    var color = props[1];
    var opacity = props[2];

    var svgElem = document.createElementNS(xmlns, "svg");
    svgElem.setAttributeNS(null, "viewBox", "0 0 " + boxWidth + " " + boxHeight);
    svgElem.setAttributeNS(null, "width", boxWidth);
    svgElem.setAttributeNS(null, "height", boxHeight);

    var g = document.createElementNS(xmlns, type);
    var pts = points(boxWidth / 3 - 3.5, boxWidth / 2);
    if (n === 1) {
      g.setAttributeNS(null, 'cx', pts[0][0]);
      g.setAttributeNS(null, 'cy', pts[0][1]);
      g.setAttributeNS(null, 'r', 3.5/2);
    } else g.setAttributeNS(null, 'points', patos(pts));

    g.setAttributeNS(null, 'stroke-width', 3.5);
    g.setAttributeNS(null, 'fill', 'none');
    g.setAttributeNS(null, 'stroke', color);
    svgElem.appendChild(g);

    var node = document.getElementById(id);
    var svgContainer = node.cloneNode(false);
    svgContainer.appendChild(svgElem);
    svgContainer.style.opacity = opacity;
    node.parentNode.replaceChild(svgContainer, node);
  });
}

//Listener functions
function navHover(_ctx) {
  if (_ctx.props.hovered) return;
  _ctx.props.hovered = true;
  var id = _ctx.id;
  var speed = 12*6;
  ['bottom', 'middle'].forEach(function(v) {
    document.getElementById(dasherize(['rotation-hack', id, v]))
    .style.animation = speed + 's rotateLeft linear';
    speed*=2;
  });
}


//Execution. Nothing here is final.
registerListeners([
  buildListener('help-nav', function(_ctx) {
    var toggle = _ctx.props.toggle;
    var node = document.getElementById('help-popup');
    if (toggle) { addNodeClass(node, 'hidden'); }
    else { removeNodeClass(node, 'hidden'); }
    _ctx.props.toggle = !toggle;
  }, 'onclick'),
  buildListener('previous', navHover, 'onmouseover'),
  buildListener('next', navHover, 'onmouseover'),
  buildListener('previous', function(_ctx) {
    print('previous');
  }, 'onclick'),
  buildListener('next', function(_ctx) {
    print('next');
  }, 'onclick'),
], 'root');

buildngon(2, 'previous');
buildngon(5, 'next');

//No-js banner removal
document
.getElementById("loader-wrapper")
.parentNode
.removeChild(document.getElementById("loader-wrapper"));

//unregister listeners
//unregister owner

//Load bars
