import { spawn_module, load, unload } from '../modules/_module';
import { build as buildngon, setPageNav } from './nav/ngon';
import { obtain } from './window_store';

const global_context = obtain();

function loadHtml(key, _timeout) {
  return new Promise((resolve, reject) => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        document.getElementById('content').innerHTML = this.responseText;
        resolve(key);
      }
    };
    xhttp.open('GET', `./js/modules/pages/${key}/fill.html`, true);
    xhttp.send();
    setTimeout(() => reject(), _timeout);
  });
}

function fetchModuleDef(key, _timeout) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.onreadystatechange = function () {
      if (this.readyState === 'complete') resolve(key);
    };
    script.onload = () => resolve(key);
    script.src = `./js/modules/pages/${key}/bundle.js`;
    document.getElementsByTagName('head')[0].appendChild(script);
    setTimeout(() => reject(), _timeout);
  });
}

function applyJS(key) {
  global_context.pages.module_def = spawn_module(window[`${key}_module`]);
  load(global_context.pages.module_def);
  global_context.pages.blocked = false;
  delete window[`${key}_module`];
}

function unloadCurrent() {
  if (global_context.pages.module_def) unload(global_context.pages.module_def);
}

function loadPage(key) {
  function unblock() { global_context.pages.blocked = false; }
  unloadCurrent();
  loadHtml(key, 500)
  .then(() => fetchModuleDef(key, 500), unblock)
  .then(() => applyJS(key), unblock);
}

function paginateTo(v) {
  if (!global_context.pages.blocked) {
    global_context.pages.blocked = true;
    global_context.pages.current = v;
    setPageNav(v);
    loadPage(global_context.pages.list[v]);
    buildngon(v - 1, 'previous', global_context.pages.list[v - 1]);
    buildngon(v + 1, 'next', global_context.pages.list[v + 1]);
  }
}

export { paginateTo as default };
