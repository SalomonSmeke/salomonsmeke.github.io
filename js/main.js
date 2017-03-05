"use strict";
var loader = document.getElementById("loader-wrapper");
loader.parentNode.removeChild(loader);

var ctx = {
  listeners: {}
};

function registerListeners(listeners, owner) {
  listeners.forEach(function (l) {
    var id = l.id;
    var f = l.f;
    var type = l.type;
    if ((id == null || f == null) || type == null) {
      console.error('Incomplete listener data. Id: %s Owner: %s', id, owner);
      return;
    }
    if (ctx.listeners[id] != null) {
      if (ctx.listeners[id][type] != null) {
        console.warn(`Replaced outdated %s listener on Id: %s Owner: %s.
         Please ensure listeners are properly unloaded.`, type, id, owner);
      }
    } else ctx.listeners[id] = {};
    var node = document.getElementById(id);
    if (node == null) {
      console.error(`Attempted listener registration on invalid node
        Id: %s`, id);
      delete ctx.listeners[id];
      return;
    }
    node[type] = f;
    ctx.listeners[id] = {id: id, owner: owner, props: {}};
    ctx.listeners[id][type] = true;
    console.log('Registered listener %s Id: %s Owner: %s', type, id, owner);
  });
};

function buildListener(id, f, type) {
  var _f = (function (id, f, type) {
    return function() { f(ctx.listeners[id]); };
  })(id, f, type);
  return {id: id, f: _f, type: type};
};

function removeNodeClass(node, c) {
  node.className = node.className.replace(c, '');
};

function addNodeClass(node, c) {
  removeNodeClass(node, c);
  node.className += c;
};

function navHover(_ctx) {
  if (_ctx.props.hovered) return;
  _ctx.props.hovered = true;
  var id = _ctx.id;
  var speed = 12*6;
  ['bottom', 'middle'].forEach(function(v) {
    document.getElementById('rotation-hack-' + id + '-' + v).style.animation = (
      speed + 's rotateLeft linear'
    );
    speed*=2;
  });
};

function buildngon(n, parent_id) {
  const xmlns = "http://www.w3.org/2000/svg";
  const boxWidth = 70;
  const boxHeight = boxWidth;

  function points(radius, pos) {
    const angle = Math.PI * 2 / n;
    var vertices = [];
    for (var a = 0; a < Math.PI * 2; a += angle) {
      var sx = pos + Math.cos(a+Math.PI/n) * radius;
      var sy = pos + Math.sin(a+Math.PI/n) * radius;
      vertices.push([sx, sy]);
    }
    return vertices;
  }
  function patos(pa) {
    var s = ""
    pa.forEach(function(pvs){
      s += pvs[0] + ", " + pvs[1] + " ";
    });
    return s.trim();
  }
  switch(n) {
    case 1:
      var type = "circle";
      break;
    case 2:
      var type = "polyline";
      break;
    default:
      var type = "polygon";
  };
  [
    ['top', '#ff3232', .88],
    ['middle', '#ff8250', .88],
    ['bottom', '#ffaa28', .9]
  ].forEach((props) => {
    var id = parent_id + '-' + props[0];
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
    } else g.setAttributeNS(null, 'points'
      , patos(pts));
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
};

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


buildngon(1, 'previous');
buildngon(3, 'next');

//unregister listeners
//unregister owner

//Load bars
//Load svg's
