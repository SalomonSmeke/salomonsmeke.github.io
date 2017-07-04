import paginateTo from '../../../lib/pagination';

window.index_module = {
  id: 'index',
  LISTENERS: [
    {
      id: 'index-nav-index',
      f: () => paginateTo(1),
      type: 'click'
    },
    {
      id: 'index-nav-about',
      f: () => paginateTo(2),
      type: 'click'
    }
  ]
};
