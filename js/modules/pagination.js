import { spawn_module } from './_module';
import { build as buildngon, setPageNav } from '../lib/nav/ngon';
import global_context from '../lib/globals';

/*
 * pagination.js
 * Stub module for controlling the blog aspect.
 */

function loadPage(key) {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      document.getElementById('content').innerHTML = this.responseText;
    }
  };
  xhttp.open('GET', `./components/${key}/fill.html`, true);
  xhttp.send();
}

function paginateTo(v) {
  global_context.pages.current = v;
  setPageNav(v);
  loadPage(global_context.pages.list[v]);
  buildngon(v - 1, 'previous', global_context.pages.list[v - 1]);
  buildngon(v + 1, 'next', global_context.pages.list[v + 1]);
}

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
