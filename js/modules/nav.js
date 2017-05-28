import { spawn_module } from './_module';
import { common as libListeners } from '../lib/listeners';
import buildngon from '../lib/nav/ngon';
import { start as scrollNavStart, scrollListener } from '../lib/nav/scrollNav';

/*
 * nav.js
 * Module exposing/building navigation interactors.
 */

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
      f: libListeners.navHover,
      type: 'mouseover'
    },
    {
      id: 'next',
      f: libListeners.navHover,
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
