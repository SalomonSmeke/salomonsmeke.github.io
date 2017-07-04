const context = {
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

export { context as default };
