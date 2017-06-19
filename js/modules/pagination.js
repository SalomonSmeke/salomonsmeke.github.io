import { spawn_module } from './_module';
import { setPage } from '../lib/nav/ngon';

/*
 * pagination.js
 * Stub module for controlling the blog aspect.
 */

const module_def = spawn_module({
  id: 'pagination',
  LOAD: [
    () => { setPage(2); }
  ]
});

export { module_def as default };
