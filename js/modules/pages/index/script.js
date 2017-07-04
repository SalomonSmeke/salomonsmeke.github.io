function test() {
  alert('yes');
}

window.index_module = {
  id: 'index',
  LISTENERS: [
    {
      id: 'index-nav-index',
      f: test,
      type: 'click'
    },
    {
      id: 'index-nav-about',
      f: test,
      type: 'click'
    }
  ]
};
