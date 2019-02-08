// to make menu to move up and down
$('.btn-switcher').click(function ( e ) {
  var p = !$('html').position().top; // 0 = false else true (boolean trick)
  $('html, .min-menu').stop().animate({ top: p? -91 : 0 });
  $(e.target).stop().animate({ bottom: p? -0 : 0  });
});
// to change text btn 
$(function(){
   $(".btn-switcher").click(function () {
      $(this).text(function(i, text){
          return text === "=" ? "X" : "=";
      })
   });
})