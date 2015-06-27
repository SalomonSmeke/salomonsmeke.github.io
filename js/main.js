$(function(){
  var viewportWidth = $(window).width();
  var viewportHeight = $(window).height();

  $('.main-box').css('height', viewportHeight + 'px');
  $('.main-box').css('width', viewportWidth + 'px');

  $(window).resize(function() {
      var viewportWidth = $(window).width();
      var viewportHeight = $(window).height();

      $('.main-box').css('height', viewportHeight + 'px');
      $('.main-box').css('width', viewportWidth + 'px');
  });
});
