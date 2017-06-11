import { spawn_module } from './_module';
import buildngon from '../lib/nav/ngon';
import { start as scrollNavStart, scrollListener } from '../lib/nav/scrollNav';
import * as _ from '../lib/minidash';

/*
 * nav.js
 * Module exposing/building navigation interactors.
 */

function nav_hover (listener_ctx) {
  if (listener_ctx.props.hovered) return;
  listener_ctx.props.hovered = true;
  let speed = 12 * 2; // 12 is the base speed.
  const nodes = ['middle', 'bottom'].map((v) => {
    const node = document.getElementById(_.dasherize(['rotation-hack', listener_ctx.id, v]));
    node.style.animation = `${speed}s rotateLeft linear`;
    speed *= 2;
    return node;
  });
  setTimeout(() => {
    nodes.forEach((n) => {
      n.style.animation = '';
      // This is a hack. But we need it to reset the animation.
      /* eslint-disable */
      void n.offsetWidth;
      /* eslint-enable */
    });
    listener_ctx.props.hovered = false;
  }, 48 * 1000); // Coalescence: ∆t = 12 * elems
}

const module_def = spawn_module({
  id: 'nav',
  LOAD: [
    () => { buildngon(1, 'previous'); },
    () => { buildngon(3, 'next'); },
    scrollNavStart
  ],
  LISTENERS: [
    {
      id: 'previous',
      f: nav_hover,
      type: 'mouseover'
    },
    {
      id: 'next',
      f: nav_hover,
      type: 'mouseover'
    },
    {
      id: 'scroll-nav',
      f: scrollListener,
      type: 'click',
      props: {
        duration: 500
      }
    }
  ]
});

export { module_def as default };
