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
    context: {
      index: {},
      about: {}
    }
  }
};

export { context as default };
