
  $(window).scroll(function(){ // scroll event
    var windowTop = $(window).scrollTop(); // returns number
 var $sticky = $('.sticky');
        $sticky.css({
        position: 'fixed', top:0
      });
})
