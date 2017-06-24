import { spawn_module } from './_module';
import { build as buildngon, setPageNav } from '../lib/nav/ngon';
import global_context from '../lib/globals';

/*
 * pagination.js
 * Stub module for controlling the blog aspect.
 */

// Unfortunately this does not work in the local browser because the path resolves to a local file.
// To test different pages, insert their HTML into the index and the rest works as normal.
function loadPage(key) {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      document.getElementById('content').innerHTML = this.responseText;
      // Eventually, this instead should turn into the series of functions that the page wants.
      // Unloading the previous module, and loading this one.
      // Where the module_def is part of pages.
      global_context.pages.blocked = false;
    }
  };
  xhttp.open('GET', `./js/modules/pages/${key}/fill.html`, true);
  xhttp.send();
}

function paginateTo(v) {
  // global_context.pages.blocked = true; This line helps run this locally.
  if (!global_context.pages.blocked) {
    global_context.pages.blocked = true;
    global_context.pages.current = v;
    setPageNav(v);
    loadPage(global_context.pages.list[v]);
    buildngon(v - 1, 'previous', global_context.pages.list[v - 1]);
    buildngon(v + 1, 'next', global_context.pages.list[v + 1]);
  }
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
