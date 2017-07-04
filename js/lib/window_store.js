function init() {
  window.context = {
    exposureRegistrar: [],
    listeners: {},
    pages: {
      default: 2,
      current: null,
      list: {
        1: 'index',
        2: 'about'
      },
      module_def: null,
      blocked: false
    }
  };
}

function obtain() {
  return window.context;
}

export { init, obtain };
