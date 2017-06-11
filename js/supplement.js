function stub() {
  // Avoid `console` errors in browsers that lack a console.
  const noop = function () {};
  const methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
  ];
  window.console = window.console || {};
  const console = window.console;
  methods.forEach((v) => { if (!console[v]) console[v] = noop; });
}

/* eslint-disable */
function analytics() {
  // Google Analytics, just pageview.
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
  ga('create', 'UA-65247529-2', 'auto');
  ga('send', 'pageview');
}
/* eslint-enable */

export { stub, analytics };
