import { spawn_module } from './_module';
import { common as libListeners } from '../lib/listeners';
import buildngon from '../lib/nav/ngon';
import start_scroll_nav from '../lib/nav/scrollNav';

/*
 * nav.js
 * Module exposing/building navigation interactors.
 */

const module_def = spawn_module({
  id: 'nav',
  LOAD: [
    () => { buildngon(1, 'previous'); },
    () => { buildngon(3, 'next'); },
    start_scroll_nav
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
    }
  ]
});

export { module_def as default };
