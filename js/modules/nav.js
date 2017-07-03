import { spawn_module } from './_module';
import { easing, scrollTo } from '../lib/animation';
import { build as buildngon } from '../lib/nav/ngon';
import scrollNavStart from '../lib/nav/scrollNav';
import * as _ from '../lib/minidash';

/*
 * nav.js
 * Module exposing/building navigation interactors.
 */

function nav_hover (local_ctx) {
  if (local_ctx.props.hovered) return;
  local_ctx.props.hovered = true;
  let speed = 12 * 2; // 12 is the base speed.
  const nodes = ['middle', 'bottom'].map((v) => {
    const node = document.getElementById(_.dasherize(['rotation-hack', local_ctx.id, v]));
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
    local_ctx.props.hovered = false;
  }, 48 * 1000); // Coalescence: ∆t = 12 * elems
}

function scrollListener(local_ctx) {
  if (local_ctx.props.running) return;
  local_ctx.props.running = true;
  function scrollFrame(time) {
    const props = local_ctx.props;
    const timeElapsed = time - props.timeStart;
    scrollTo(0, easing(timeElapsed, props.start, props.distance, props.duration));
    if (timeElapsed < props.duration) {
      window.requestAnimationFrame(scrollFrame);
    } else {
      scrollTo(0, props.start + props.distance);
      props.running = false;
    }
  }
  local_ctx.props.start = window.pageYOffset;
  local_ctx.props.distance = window.innerHeight / 2 > local_ctx.props.start ?
  document.getElementById('content-wrapper').getBoundingClientRect().top :
  document.getElementById('spread').getBoundingClientRect().top;

  window.requestAnimationFrame((time) => {
    local_ctx.props.timeStart = time;
    scrollFrame(time);
  });
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
