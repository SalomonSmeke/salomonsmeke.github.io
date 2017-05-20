import {
  spawn_module,
  load
} from './_module';
import helpPopup from './helpPopup';
import nav from './nav';
import bars from './bars';

/*
 * root.js
 * Pseudo module containing the initial portions of the app.
 * Saves me some imports in the entry point.
 */

const module_def = spawn_module({
  id: 'root',
  LOAD: [
    () => { load(helpPopup); },
    () => { load(nav); },
    () => { load(bars); }
  ]
});

export { module_def as default };
