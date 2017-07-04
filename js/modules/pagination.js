import { spawn_module } from './_module';
import paginateTo from '../lib/pagination';
import { obtain } from '../lib/window_store';

const global_context = obtain();

/*
 * pagination.js
 * Module for controlling the blog aspect.
 */

function nextPage() {
  if (global_context.pages.list[global_context.pages.current + 1]) {
    paginateTo(global_context.pages.current + 1);
  }
}

function previousPage() {
  if (global_context.pages.list[global_context.pages.current - 1]) {
    paginateTo(global_context.pages.current - 1);
  }
}

const module_def = spawn_module({
  id: 'pagination',
  LOAD: [
    () => { paginateTo(global_context.pages.default); }
  ],
  LISTENERS: [
    {
      id: 'previous',
      f: previousPage,
      type: 'click'
    },
    {
      id: 'next',
      f: nextPage,
      type: 'click'
    }
  ]
});

export { module_def as default };
